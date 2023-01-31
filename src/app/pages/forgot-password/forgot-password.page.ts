import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/shared/models/user.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { ToastController } from '@ionic/angular';


@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

    versionNumber: String;
    versionDate: String;

    isLoading = false;
    user: User = new User(null, '', '', null, null);

    constructor(private router: Router,
        private alertCtrl: AlertController,
        private accountService: AccountService,
        private toastController: ToastController
    ) {

    }

    ngOnInit() {

    }

    async forgotPassword() {
        if (!this.user.username || this.user.username === '') {
            await this.showErrorMessage('Atenção', 'Preencha o campo antes de continuar');
            return;
        } else if(!this.user.username.match("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")){
            await this.showErrorMessage('Atenção', 'Insira um formato de e-mail valido');
            return;
        } else {
            this.isLoading = true;

            this.accountService.forgotPassword(this.user.username).subscribe(async res => {
                this.isLoading = false;

                if (res) {
                    this.router.navigateByUrl('/login').finally();
                    const toast = await this.toastController.create({
                        message: 'Envio para troca de senha efetuado com sucesso!',
                        duration: 3000,
                        color: 'success',
                        position: 'bottom',
                    });
                    toast.present();
                }

            }, async (err) => {
                this.isLoading = false;
                console.log(err);
                this.showErrorMessage(' ', err.error.message);
                this.router.navigateByUrl('/login').finally();
            });
        }

    }

    private async showErrorMessage(title: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: title, message, buttons: ['OK']
        });

        await alert.present();
    }

}
