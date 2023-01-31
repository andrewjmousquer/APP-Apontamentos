import { Classifier } from "./../../shared/models/classifier.model";
import { ClassifierService } from "./../../shared/services/classifier.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AlertController,ModalController} from "@ionic/angular";

import { ServiceOrderModalPage } from "./../service-order-modal/service-order-modal.page";

import { TaskService } from "./../../shared/services/task.service";

import { TaskModel, TaskUserModel } from "./../../shared/models/task.model";
import { interval } from "rxjs";

@Component({
  selector: "app-service-order",
  templateUrl: "./service-order.page.html",
  styleUrls: ["./service-order.page.scss"],
})
export class ServiceOrderPage implements OnInit {
  isLoading = false;
  submitted = false;
  minLength = 6;
  progress: boolean;
  refreshPage: any;

  segment: string = "openTasks";
  processStatus: Classifier[];

  taskList: TaskModel[] = [];
  taskListInProgress: TaskUserModel[] = [];
  taskUserItem = [];

  modelSearch = new FormGroup({
    osOrChassi: new FormControl("", [
      Validators.required,
      Validators.minLength(this.minLength),
    ]),
  });

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private taskService: TaskService,
    private classifierService: ClassifierService
  ) {}

  ngOnInit() {
    this.loadCombos();
    this.listTasks();
    this.modelSearch;
    
  }

  observable = interval(300000);
  subscription = this.observable.subscribe((x) => this.listTasks());

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  canStart(id: number) {
    return !this.taskList.some((t) => t.id == id);
  }

  loadCombos() {
    this.classifierService.getByType("PROCESS_STATUS").subscribe((data) => {
      this.processStatus = data;
    });
  }

  listTasks() {
    this.clearInputSearch();
    // this.taskService.getAvalible().subscribe(
    //   data => {
    //     data.forEach((element) => {
    //       this.taskList.push(element);
    //   });
    // });

    this.taskService.getInProgress().subscribe(
      data => {
        data.forEach((element) => {
          this.taskListInProgress.push(element);
          this.taskListInProgress.length > 0 ? this.segment = 'inProgress' : this.segment = 'openTasks';
      });
    });
  }

  searchServiceOrder() {
    this.isLoading = true;
    if (
      this.modelSearch.get("osOrChassi").value != null &&
      this.modelSearch.get("osOrChassi").value != ""
    ) {
      this.taskService
        .search(this.modelSearch.get("osOrChassi").value)
        .subscribe(
          (data: TaskModel[]) => {
            this.taskList = data;
            this.isLoading = false;
          },
          async (err) => {
            this.isLoading = false;
            this.showErrorMessage(" ", err.error.message);
            this.listTasks();
          }
        );
    } else {
      this.listTasks();
      this.isLoading = false;
    }
  }

  async openModal(item: TaskModel) {
    const modal = await this.modalController
      .create({
        component: ServiceOrderModalPage,
        componentProps: {
          taskItem: item,
          canStart: this.canStart(item.id),
        },
      })
      .then((modalChild) => {
        modalChild.present();
        modalChild.onDidDismiss().then(e => {
          if (e.role != null) {
            this.listTasks();
          }
        })
      });
  }

  private async showErrorMessage(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  clearInputSearch() {
    this.taskList = [];
    this.taskListInProgress = [];
    this.taskUserItem = [];
    this.modelSearch.reset({ osOrChassi: "" });
  }
}
