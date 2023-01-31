import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController, NavParams, ToastController } from "@ionic/angular";
import { Classifier } from "src/app/shared/models/classifier.model";
import { StageMovimentsModel } from "src/app/shared/models/stage-moviments.model";
import { StageModel } from "src/app/shared/models/stage.model";
import { ClassifierService } from "src/app/shared/services/classifier.service";
import { TaskService } from "src/app/shared/services/task.service";


@Component({
  selector: "app-non-complience-modal",
  templateUrl: "./non-complience-modal.page.html",
  styleUrls: ["./non-complience-modal.page.scss"],
})
export class NonComplianceModalPage implements OnInit {
  isLoading = false;

  stage: StageModel
  idTask: number;

  movementList: StageMovimentsModel[];
  typeMovementList: Classifier[];

  selectedStage: number[] = [];
  selectedMovement: number;

  selectedMovements: number[] = [];

  public form = [];

  constructor(
    private navParams: NavParams,
    private modalControler: ModalController,
    private classifierService: ClassifierService,
    private taskService: TaskService,
    private alertController: AlertController,
    private toasterController: ToastController
  ) {  }

  ngOnInit() {
    this.navParams.get('idTask');
    this.navParams.get('stage'); 
    this.loadCombos();  
  }

 loadCombos(){  
  this.movementList = this.stage.moviments.filter(m =>  m.type.value === 'SPECIAL');

  this.classifierService.getByType('SPECIAL_MOVEMENT_DESCRIPTION_TYPE').subscribe(
    data => {
      if (data) {
       
        this.typeMovementList = data;
        this.typeMovementList.forEach(e => {
          this.form.push({ val: e, isChecked: false})
        })
      }
      
    }, err => {
       this.showErrorMessage("", err.error.message);
    })
}

saveSpecialService() {
  if (this.selectedMovement != null && this.selectedMovements.length > 0) {
    this.isLoading = true;
    this.taskService.insertSpecialService(this.idTask, this.selectedMovement, this.selectedMovements).subscribe(
      res => {
      if (res == true) {
        this.toasterMessage('Tarefa inserida com sucesso!', 'success');
        this.isLoading = false;
        this.closeModal();
      }
    }, err => {
      this.showErrorMessage("", err.error.message);
      this.closeModal();
    })
  }
}

private async showErrorMessage(title: string, message: string) {
  const alert = await this.alertController.create({
    header: title,
    message,
    buttons: ["OK"],
  });
  await alert.present();
}

private async toasterMessage(message: string, color: string) {
  const toaster = await this.toasterController.create({
    message: message,
    color: color,
    position: 'top',
    duration: 3000
  })

  await toaster.present();
}

addMovement(value, checked){
  if (checked) {
    this.selectedMovements.push(value)
  }
  else{
    this.selectedMovements = this.selectedMovements.filter(e => e !== value)
  }
}


  closeModal() {
    this.modalControler.dismiss();
  }
}
