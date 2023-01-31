import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { systemEnvironment } from '../../../environments/system-environment';
import jsQR from 'jsqr';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    versionNumber: String;
    versionDate: String;

    isLoading = false;
    user: User = new User(null, '', '', null, null);
    @ViewChild('video', { static: false }) video: ElementRef;
    @ViewChild('canvas', { static: false }) canvas: ElementRef;
    @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

    canvasElement: any;
    videoElement: any;
    canvasContext: any;
    scanActive = false;
    scanResult = null;
    loading: HTMLIonLoadingElement = null;
    qrCode: boolean = false;
    userPass: boolean = false;
    showPass: boolean = false;
    passwordIcon = 'eye';



    constructor(private router: Router,
        private toastCtrl: ToastController,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private auth: AuthService,
        private plt: Platform,
        private loadingCtrl: LoadingController
    ) {


        this.auth.user.subscribe((user: User) => {
            if (user && user.accessList != null && user.accessList.defaultMenu != null) {
                this.router.navigateByUrl('/tabs/' + user.accessList.defaultMenu.route).finally();
            } else {
                this.router.navigateByUrl('/tabs/home').finally();
            }
        });

        const isInStandaloneMode = () =>
            'standalone' in window.navigator && window.navigator['standalone'];
        if (this.plt.is('ios') && isInStandaloneMode()) {
            console.log('I am a an iOS PWA!');
        }

    }


    ngOnInit() {
        this.auth.loadStoredToken().finally();

        this.versionDate = systemEnvironment.versionDate;
        this.versionNumber = systemEnvironment.versionNumber;
    }

    async login() {

        if (!this.user.username || this.user.username === '' ||
            !this.user.password || this.user.password === '') {

            await this.showErrorMessage('Atenção', 'Preencha os campos antes de continuar');
            return;
        }

        this.isLoading = true;

        this.auth.login(this.user).subscribe(async res => {
            this.isLoading = false;

            if (res) {
                if (res && res.accessList != null && res.accessList.defaultMenu != null) {
                    await this.navCtrl.navigateRoot('/tabs/' + res.accessList.defaultMenu.route).finally();
                } else {
                    this.navCtrl.navigateRoot('/tabs/home').finally();
                }
            } else {
                await this.showErrorMessage('Falha no login', 'Verifique se as informações estão corretas');
            }

        }, (async reason => {
            this.isLoading = false;

            console.error('An error occurred during login: ', JSON.stringify(reason));

            if (reason && reason.error && reason.error.message) {
                await this.showErrorMessage('Falha no login', reason.error.message);
            } else {
                await this.showErrorMessage('Falha no login', 'Não foi possível fazer login');
            }
        }));
    }

    toggleShow() {
        this.showPass = !this.showPass;
        this.passwordIcon = this.passwordIcon == 'eye' ? 'eye-off' : 'eye';
    }

    captureImage() {
        this.fileinput.nativeElement.click();
    }

    handleFile(files: FileList) {
        const file = files.item(0);

        var img = new Image();
        img.onload = () => {
            this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
            const imageData = this.canvasContext.getImageData(
                0,
                0,
                this.canvasElement.width,
                this.canvasElement.height
            );
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert'
            });

            if (code) {
                this.scanResult = code.data;
                this.showQrToast();
            }
        };
        img.src = URL.createObjectURL(file);
    }

    async loginQR() {

        if (!this.scanResult || this.scanResult === '' ||
            this.scanResult.length < 100) {

            await this.showErrorMessage('Atenção', 'Escaneie o código novamente!');
            return;
        }

        this.isLoading = true;

        this.auth.loginQR(this.scanResult).subscribe(async res => {
            this.isLoading = false;

            if (res) {
                if (res && res.accessList != null && res.accessList.defaultMenu != null) {
                    await this.navCtrl.navigateRoot('/tabs/' + res.accessList.defaultMenu.route).finally();
                } else {
                    this.navCtrl.navigateRoot('/tabs/home').finally();
                }
            } else {
                await this.showErrorMessage('Falha no login', 'Verifique se as informações estão corretas');
            }

        }, (async reason => {
            this.isLoading = false;

            console.error('An error occurred during login: ', JSON.stringify(reason));

            if (reason && reason.error && reason.error.message) {
                await this.showErrorMessage('Falha no login', reason.error.message);
            } else {
                await this.showErrorMessage('Falha no login', 'Não foi possível fazer login');
            }
        }));
    }

    registerUser() {
        this.router.navigateByUrl('/register-user').finally();
    }



    forgotPassword() {
        this.router.navigateByUrl('/forgot-password').finally();
    }

    private async showErrorMessage(title: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: 'Falha no login', message, buttons: ['OK']
        });

        await alert.present();
    }


    // Helper functions
    async showQrToast() {
        const toast = await this.toastCtrl.create({
            message: `Conectando ao sistema...`,
            position: 'top',
            icon: 'information-circle',
            color: 'warning',
            duration: 1000
        });
        toast.present();
        this.loginQR();
    }

    reset() {
        this.scanResult = null;
    }

    stopScan() {
        this.scanActive = false;
        setTimeout(() => {
            this.canvasElement = undefined;
            this.canvasContext = undefined;
            this.videoElement = undefined;
        })
    }

    async startScan() {
        // Not working on iOS standalone mode!
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });

        this.videoElement.srcObject = stream;
        // Required for Safari
        this.videoElement.setAttribute('playsinline', true);

        this.loading = await this.loadingCtrl.create({});
        await this.loading.present();

        this.videoElement.play();
        requestAnimationFrame(this.scan.bind(this));
    }

    async scan() {
        if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
            if (this.loading) {
                await this.loading.dismiss();
                this.loading = null;
                this.scanActive = true;
            }

            this.canvasElement.height = this.videoElement.videoHeight;
            this.canvasElement.width = this.videoElement.videoWidth;

            this.canvasContext.drawImage(
                this.videoElement,
                0,
                0,
                this.canvasElement.width,
                this.canvasElement.height
            );
            const imageData = this.canvasContext.getImageData(
                0,
                0,
                this.canvasElement.width,
                this.canvasElement.height
            );
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert'
            });

            if (code) {
                this.scanActive = false;
                this.scanResult = code.data;
                this.showQrToast();
            } else {
                if (this.scanActive) {
                    requestAnimationFrame(this.scan.bind(this));
                }
            }
        } else {
            requestAnimationFrame(this.scan.bind(this));
        }
    }


    isQrCode() {
        this.userPass = false;
        this.qrCode = true;

        setTimeout(() => {
            this.canvasElement = this.canvas.nativeElement;
            this.canvasContext = this.canvasElement.getContext('2d');
            this.videoElement = this.video.nativeElement;
            this.startScan();
        })
    }
    isUserPass() {
        this.userPass = true;
        this.qrCode = false;
        this.stopScan();
    }
    resetChoice() {
        this.qrCode = false;
        this.userPass = false;
    }

}
