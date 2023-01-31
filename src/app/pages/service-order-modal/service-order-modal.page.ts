import { CheckListAnswerModel } from './../../shared/models/checklist-answer.model';
import { CheckListModel } from './../../shared/models/checklist.model';
import { CheckListService } from './../../shared/services/checklist.service';
import { MovimentsModalPage } from './../moviments-modal/moviments-modal.page';
import { StageModel } from './../../shared/models/stage.model';
import { StageService } from './../../shared/services/stage.service';
import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController, NavParams, ToastController } from "@ionic/angular";

import { ChecklistPage } from "./../checklist/checklist.page";

import { TaskService } from './../../shared/services/task.service';

import { Classifier } from './../../shared/models/classifier.model';
import { TaskModel, TaskUserModel } from "./../../shared/models/task.model";
import { StageMovimentsModel } from 'src/app/shared/models/stage-moviments.model';
import { NonComplianceModalPage } from '../non-complience-modal/non-complience-modal.page';
import { ServiceOrderService } from 'src/app/shared/services/service-order.service';
import { TaskWithTimeModel } from 'src/app/shared/models/task-with-time.model';
@Component({
  selector: "app-service-order-modal",
  templateUrl: "./service-order-modal.page.html",
  styleUrls: ["./service-order-modal.page.scss"],
})
export class ServiceOrderModalPage implements OnInit {
  isLoading = false;
  checklistStatus = false;
  hasChecklist = false;
  hasSpecialService = false;

  totalTaskTime: string = "";

  checkList: CheckListModel;

  selectedTask: TaskWithTimeModel[];

  taskItem: TaskModel;
  taskUserItem: TaskModel;
  listUsers: TaskUserModel[] = [];

  processStatus: Classifier[]
  stage: StageModel;


  @Input() canStart: boolean;

  constructor(
    private navParams: NavParams,
    private modalControler: ModalController,
    private toasterController: ToastController,
    private taskService: TaskService,
    private stageService: StageService,
    private alertController: AlertController,
    private checkListService: CheckListService,
    private osService: ServiceOrderService
  ) { }

  ngOnInit() {
    this.navParams.get("taskItem");
    this.loadCombos();
  }

  loadCombos(){
      this.taskService.getByUser(this.taskItem.id).subscribe(
        data => {
          if (data) 
            this.taskUserItem = data;
      },err =>{
       if (err.status != 404) 
          this.showErrorMessage("", err.error.message);  
      });

      this.stageService.getById(this.taskItem.stage.id).subscribe(
        data => {
          this.stage = data;
          let test = this.stage.moviments.filter(m => m.type.value === 'SPECIAL');

          if (test.length > 0)
            this.hasSpecialService = true;
          
          if (this.stage.checklist != null && this.stage.checklist != undefined)
            this.loadAnswered();
        })

        this.taskService.listUsers(this.taskItem.id).subscribe(
          (data) => {
            if (data) {
              this.listUsers = data;
            }
          },err =>{
            if (err.status != 404) 
               this.showErrorMessage("", err.error.message);  
           }
        )

        this.osService.getById(this.taskItem.serviceOrder.id).subscribe(
          (data) => {
              this.selectedTask = data.tasks.filter((t) => t.id == this.taskItem.id);
              this.totalTaskTime = this.selectedTask[0].totalTime;
        });
  }

  movimentTask(moviment: string) {
    if (moviment == 'start') {
      this.isLoading = true;
      this.taskService.start(this.taskItem.id).subscribe(
        data => {
          if(data){
            this.toasterMessage('Tarefa iniciada com sucesso!', 'success');
            this.movimentAndCloseModal();
            this.isLoading = false;
          }
        }, err => {
          this.showErrorMessage("", err.error.message);
          this.isLoading = false;
        }
      )
    }
    else if (moviment == 'pause') {
      this.isLoading = true;
      this.taskService.pause(this.taskItem.id).subscribe(
        data => {
          this.toasterMessage('Tarefa pausada!', 'tertiary');
          this.movimentAndCloseModal();
          this.isLoading = false;
        }, err => {
          this.showErrorMessage("", err.error.message);
          this.isLoading = false;
        });
    }
    else if (moviment == 'resume') {
      this.isLoading = true;
      this.taskService.resume(this.taskItem.id).subscribe(
        data => {
          if (data) {   
            this.toasterMessage('Tarefa reiniciada!', 'secondary');
            this.movimentAndCloseModal();
            this.isLoading = false;
          }
        }, err => {
          this.showErrorMessage("", err.error.message);
          this.isLoading = false;
        });
    }
    else {
      let movimentsTmp = [];
      movimentsTmp = this.stage.moviments.filter(m => m.type.value === 'MOVEMENT');

      if (movimentsTmp.length == 1) {
        this.isLoading = true;
        this.taskService.finish(this.taskItem.id, movimentsTmp[0].id).subscribe(
          (data) => {
            this.toasterMessage('Tarefa encerrada com sucesso!', 'success');
            this.movimentAndCloseModal();
            this.isLoading = false;
          }, async (err) => {
            this.showErrorMessage("", err.error.message);
            this.isLoading = false;
          });
      }
      else {
        this.openModalMoviments(movimentsTmp);
      }
    }
  }

  loadAnswered() {
    this.checkListService.getAnswerByChecklist(this.taskItem.id).subscribe(
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
          this.ckAnswered();
          this.hasChecklist = true;
        });
      }, (err) => {
        this.showErrorMessage("", err.error.message);
      })
  }

  ckAnswered() {
    let ckAnswered = true;
    if (this.checkList != undefined && this.checkList.groups != undefined) {
      this.checkList.groups.forEach(groups => {
        groups.answered < groups.questions.length ? ckAnswered = true : ckAnswered = false;
      });
    }
    this.checklistStatus = ckAnswered;
  }

  async openModalMoviments(moviments: StageMovimentsModel[]) {
    const modal = await this.modalControler.create({
      component: MovimentsModalPage,
      cssClass: 'moviments-modal',
      componentProps: {
        moviments: moviments
      }
    }).then(moviment => {
      moviment.present();
      moviment.onDidDismiss().then(finish => {
        this.isLoading = true;
        if (finish.data != null && finish.data != undefined) {
          this.taskService.finish(this.taskItem.id, finish.data).subscribe(data => {
            this.toasterMessage('Tarefa encerrada com sucesso!', 'success');
            this.closeModal();
            this.isLoading = false;
          }, async (err) => {
            this.showErrorMessage("", err.error.message);
            this.isLoading = false;
          })
        }
      });
    });
  }

  async openModal(idTask: number) {
    const modal = await this.modalControler.create({
      component: ChecklistPage,
      componentProps: {
        idTask: idTask,
        checkList: this.checkList
      }
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(checklist => {
        this.checkList = checklist.data;
        this.loadAnswered();
        this.ckAnswered()
      })
    });
  }

  async openNonComplianceModal(idTask: number){
    const modal = await this.modalControler.create({
      component: NonComplianceModalPage,
      cssClass: 'special-movement-modal',
      componentProps: {
        idTask: idTask,
        stage: this.stage
      }
    })
    return await modal.present();
  }

  async finishAlert() {
    const alert = await this.alertController.create({
      header: `Deseja finalizar a tarefa atual?`,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            alert.onDidDismiss();
          },
        },
        {
          text: "Finalizar",
          role: "confirmar",
          handler: () => {
            this.movimentTask('finish');
          },
        },
      ],
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

  private async showErrorMessage(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  closeModal() {
    this.modalControler.dismiss(this.taskUserItem, null);
  }
  
  movimentAndCloseModal() {
    this.modalControler.dismiss(this.taskUserItem, 'moviment');
  }

}
