import { TaskModel, TaskUserModel } from "./../models/task.model";
import { Injectable } from "@angular/core";

import { DefaultHttpService } from "./default-http.service";
import { NonComplienceFactory } from "src/app/pages/non-complience-modal/non-complience.factory";

@Injectable({ providedIn: "root" })
export class TaskService {

  constructor(private http: DefaultHttpService, private factory: NonComplienceFactory) { }

  search(osOrChassi: string) {
    return this.http.get(`/protected/task/osOrChassi/?osOrChassi=${osOrChassi}`);
  }

  getInProgress() {
    return this.http.get<TaskUserModel[]>(`/protected/task/user/progress`);
  }

  getAvalible() {
    return this.http.get<TaskModel[]>(`/protected/task/user/avalible`);
  }

  getByUser(id: number){
    return this.http.get<TaskModel>(`/protected/task/by-user/?taskID=${id}`);
  }

  start(id: number) {
    return this.http.get(`/protected/task/start/?task=${id}`);
  }

  pause(taskId: number) {
    return this.http.get(`/protected/task/pause?task=${taskId}`);
  }

  resume(taskId: number) {
    return this.http.get(`/protected/task/resume?task=${taskId}`);
  }

  finish(taskId: number, movimentId: number) {
    return this.http.get(`/protected/task/finish?task=${taskId}&moviment=${movimentId}`);
  }

  listUsers(taskId: number){
    return this.http.get<TaskUserModel[]>(
      `/protected/task/list-users/?task=${taskId}`);
  }

  insertSpecialService(taskId: number, movimentID: number, classifiersId: number[]) {
    return this.http.post<boolean>(`/protected/task/special`, this.factory.convertToSaveSpecialService(taskId, movimentID, classifiersId));
  }
}