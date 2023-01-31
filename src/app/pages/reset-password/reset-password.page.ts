import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { AuthService } from 'src/app/shared/services/auth.service';

import { User } from 'src/app/shared/models/user.model';
import { AccountService } from 'src/app/shared/services/account.service';

import { systemEnvironment } from 'src/environments/system-environment';
import { ToastController } from '@ionic/angular';
import { waitForAsync } from '@angular/core/testing';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

    versionNumber: String;
    versionDate: String;

    isLoading = false;
    showPage = false;
    user: User = new User(null, '', '', null, null);

    constructor(private router: Router,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private auth: AuthService,
        private accountService: AccountService,
        private toastController: ToastController
    ) {

    }

    ngOnInit() {
        this.user.forgotKey = (this.router.url).substring(16);

        this.accountService.verifyForgotKey(this.user.forgotKey).subscribe(async res => {
            if (res) {
                this.showPage = true;
            }
        },
            async (err) => {
                this.showErrorMessage(' ', err.error.message);
                this.router.navigateByUrl('/login').finally();
            },
        )


    }

    async resetPassword() {
        if (!this.user.password || this.user.password === '') {
            await this.showErrorMessage('Atenção', 'Preencha o campo antes de continuar');
            return;
        } else {
            this.isLoading = true;

            this.accountService.changePasswordForgotKey(this.user).subscribe(async res => {
                this.isLoading = false;

                if (res) {
                    this.router.navigateByUrl('/login').finally();
                    const toast = await this.toastController.create({
                        message: 'Troca de senha efetuada com sucesso!',
                        duration: 3000,
                        color: 'success',
                        position: 'bottom',
                    });
                    toast.present();
                }

            },
                async (err) => {
                    this.isLoading = false;
                    this.showErrorMessage(' ', err.error.message);

                },
            );
        }

    }

    private async showErrorMessage(title: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: title, message, buttons: ['OK']
        });

        await alert.present();
    }

}
