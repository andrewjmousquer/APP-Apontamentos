import { Filesystem, Directory } from '@capacitor/filesystem';
import { Classifier } from './../../shared/models/classifier.model';
import { Component, OnInit } from "@angular/core";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { AlertController, ModalController, NavParams, ToastController } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx"

import { ChecklisCommentPage } from './../checklist-comment/checklist-comment.page';
import { ChecklistCommentViewPage } from '../checklist-comment-view/checklist-comment-view.page';

import { ClassifierService } from './../../shared/services/classifier.service';
import { CheckListAnswerService } from './../../shared/services/checklist-answer.service';
import { CheckListService } from './../../shared/services/checklist.service';

import { CheckListModel } from "./../../shared/models/checklist.model";
import { CheckListQuestionModel } from './../../shared/models/checklist-question.model';
import { CheckListAnswerModel } from './../../shared/models/checklist-answer.model';


@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.page.html",
  styleUrls: ["./checklist.page.scss"],
  providers: [File]
})
export class ChecklistPage implements OnInit {
  idTask: number;

  checkList: CheckListModel;
  radioOptions: Classifier[];

  images: Blob;
  fileName: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private checkListService: CheckListService,
    private cklAnswerService: CheckListAnswerService,
    private classifierService: ClassifierService,
    private toasterController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.navParams.get("idTask");
    this.loadCombos();
  }

  ionViewDidLeave() {
    this.checkList = new CheckListModel();
  }


  loadCombos() {
    this.classifierService.getByType('CHECKLIST_ANSWER').subscribe(
      (data) => {
      this.radioOptions = data.sort((first, second) => (first > second) ? 1 : -1);
    }),(err) =>{
      this.showErrorMessage(" ", err.error.message);
    }

    this.checkListService.getAnswerByChecklist(this.idTask).subscribe(
      (data: any) => {
        this.checkList = data.checklist;
        this.checkList.groups.forEach(group => {
          group.answered = 0;
          group.questions.forEach(question => {
            question.answer = data.answers.find(answer => answer.question.id == question.id);
            if (question.answer != undefined) {
              group.answered++
            } else {
              question.answer = new CheckListAnswerModel();
            }
          });
        });
      }, (err) => {
        this.showErrorMessage(" ", err.error.message);
      })
  }

  saveOnChange(answer, question) {
    if (answer.question == undefined || answer.question == null) {
      answer.question = question;
      answer.task = this.idTask;
    }
    if (answer.answer.id == 42 || answer.answer.id == 44) {
      this.saveChecklist(answer);
    } 
    else if (answer.answer.id == 43) {
      this.openCommentModal(answer);
    }
  }

  enableSaveAndFinish() {
    let disabled = true;
    if (this.checkList != undefined && this.checkList.groups != undefined) {
      this.checkList.groups.forEach(groups => {
        groups.answered < groups.questions.length ? disabled = true : disabled = false;
      });
    }
    return disabled;
  }

  saveChecklist(answer) {
    this.cklAnswerService.saveOrUpdate(answer, this.images, this.fileName).subscribe(
      (data) => {
      if (data) {
        this.toasterMessage('Item salvo com sucesso!', 'success');
      }
      this.loadCombos();
    }),(err) => {
      this.showErrorMessage(" ", err.error.message);
    }
  }

  async saveAndFinish() {
    const alert = await this.alertController.create({
      header: "Deseja salvar e finalizar o checklist?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            alert.onDidDismiss();
          },
        },
        {
          text: "Salvar",
          role: "confirmar",
          handler: () => {
            this.modalController.dismiss(this.checkList);
          },
        },
      ],
    });
    await alert.present();

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
      this.saveChecklist(answer);
    });
    return {
      filepath: this.fileName,
      webviewPath: photo.webPath
    };
  }

  private async readAsBase64(photo: Photo, answer) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    this.images = blob;
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  async openModalCommentView(item: CheckListQuestionModel) {
    const modal = await this.modalController.create({
      component: ChecklistCommentViewPage,
      componentProps: {
        answerId: item.answer.id,
      },
    });
    return await modal.present();
  }

  async openCommentModal(answer: CheckListAnswerModel) {
    const modal = await this.modalController.create({
      component: ChecklisCommentPage,
      mode: 'ios',
      cssClass: 'half-modal',
      componentProps: {
        model: answer
      }
    }).then(modalChild => {
      modalChild.present();
      modalChild.onDidDismiss().then(e => {
        if (e.role == "confirm") {
          this.images = e.data.blobImages;
          this.fileName = e.data.fileName;
          this.saveChecklist(answer);
        } else {
          this.loadCombos();
        }
      })
    })
  }

  private async showErrorMessage(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  private async toasterMessage(text: string, color: string) {
    const toaster = await this.toasterController.create({
      message: text,
      color: color,
      duration: 3000,
      position: 'top'
    })
    toaster.present();
  }

  closeModal() {
    this.modalController.dismiss(this.checkList);
  }

}
