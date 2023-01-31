import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


import { CheckListAnswerModel } from './../../shared/models/checklist-answer.model';

@Component({
    selector: "app-checklist-comment",
    templateUrl: "./checklist-comment.page.html",
    styleUrls: ["./checklist-comment.page.scss"],
})
export class ChecklisCommentPage implements OnInit {
    isLoading: boolean;
    model: CheckListAnswerModel;

    images: Blob;
    fileName: string;
    modelComment = new FormGroup({
        comment: new FormControl('', [
            Validators.required
        ])
    });

    constructor(private modalController: ModalController,
        private toasterController: ToastController) { }

    ngOnInit() {
    }

    sendComment() {
        if (this.model.answer.id == 43 || this.model.id == 0) {
            if (this.modelComment.get('comment').value != null && this.modelComment.get('comment').value != ""
                && (this.model.blobImages !== null && this.model.blobImages != undefined)) {
                this.saveAndCloseModal();
            } else {
                this.toasterMessage('ATENÇÃO:', 'Foto e comentario são obrigatorios em caso de NOK!');
            }
        } else {
            this.saveAndCloseModal();
        }
    }

    private async toasterMessage(tittle: string, message: string) {
        const toaster = await this.toasterController.create({
            header: tittle,
            message: message,
            color: 'danger',
            position: 'middle',
            buttons: [
                {
                    side: 'end',
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        toaster.onDidDismiss();
                    }
                }
            ]
        })

        await toaster.present();
    }

    async takePicture(answer) {
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        if (capturedPhoto) {
            const savedImage = await this.savePicture(capturedPhoto, answer);
        }
    }

    private async savePicture(photo: Photo, answer) {
        const base64Data = await this.readAsBase64(photo, answer);
        this.fileName = new Date().getTime() + '.png';
        const savedFile = await Filesystem.writeFile({
            path: this.fileName,
            data: base64Data,
            directory: Directory.Data
        }).then(() => {
            this.model.fileName = this.fileName;
        });
        return {
            filepath: this.fileName,
            webviewPath: photo.webPath
        };
    }

    private async readAsBase64(photo: Photo, answer) {
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        this.model.blobImages = blob;
        return await this.convertBlobToBase64(blob) as string;
    }

    private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    saveAndCloseModal() {
        this.model.comment = this.modelComment.get('comment').value;
        this.modalController.dismiss(this.model, 'confirm');
    }

    closeModal() {
        this.modalController.dismiss(this.model, 'cancel');
    }
    
}