import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { AdmissionService } from '../../services/admission.service';
import { AlertController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsService } from 'src/app/shared/services/reactive-forms';


@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

    @Input() consentId: Number;
    @Input() consentAccepted: Boolean;
    @Output() confirmar = new EventEmitter<any>();

    formAdd: FormGroup;



    constructor(
        private admissionService: AdmissionService,
        private alertCtrl: AlertController,
        private toastController: ToastController,
    ) { }

    ngOnChanges() {
        this.formAdd = new FormGroup({
            checked: new FormControl(this.consentAccepted, [
                Validators.required,
            ]),
        })
    }

    ngOnInit() {
    }

    sendAccept() {
        this.admissionService.acceptConsentForm(this.consentId).subscribe(async res => {

            if (res == true) {
                this.confirmar.emit(res);
            }
        }, err => {
            this.showMessage('Erro', err.error.message)
        })
    }

    markCheckbox(event: any) {
        let check = event.detail.checked
        this.formAdd.controls['checked'].setValue(check)
    };

    private async showMessage(title: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: title, message, buttons: ['OK']
        });
        await alert.present();
    }
}
