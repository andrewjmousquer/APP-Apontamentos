import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { listaVagas } from '../../../../resources/mock';
import { ReactiveFormsService } from 'src/app/shared/services/reactive-forms';
import { VacancyData } from 'src/app/shared/models/vacancy-list.model';
import { VacancyService } from 'src/app/shared/services/vacancy.service';
import { FavoriteJob } from 'src/app/shared/models/favorite-job.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';


@Component({
    selector: 'app-document-signature',
    templateUrl: './document-signature.page.html',
    styleUrls: ['./document-signature.page.scss'],
    providers: [ReactiveFormsService]
})
export class DocumentSignaturePage implements OnInit {

    isLoading = false;
    loggedInUser: User;




    constructor(
        private modalController: ModalController,
        private alertCtrl: AlertController,
    ) { }

    ngOnInit() {
    }

    async closeModal() {
        await this.modalController.dismiss()
    }

    private async showErrorMessage(title: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: title, message, buttons: ['OK']
        });
        await alert.present();
    }

}
