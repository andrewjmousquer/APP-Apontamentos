import { Injectable } from "@angular/core";
import { InsertOrEditSpecialServiceModel } from "src/app/shared/models/insert-or-edit-special-service.model";
import { TaskModel } from "src/app/shared/models/task.model";


@Injectable({ providedIn: 'root' })
export class NonComplienceFactory {

  constructor() { }

  public convertToSaveSpecialService(taskId: number, movimentID: number, classifiersId: number[]) {
    let toSave = new InsertOrEditSpecialServiceModel();

    toSave.taskID = taskId;
    toSave.movementID = movimentID;
    toSave.classifiersId = classifiersId;

    return toSave;
  }
}