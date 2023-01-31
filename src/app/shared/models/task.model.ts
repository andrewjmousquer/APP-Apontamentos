import { StageModel } from "./stage.model";
import { ServiceOrderModel } from "src/app/shared/models/service-order.model";
import { Classifier } from "./classifier.model";
export class TaskModel {
  public id: number;
  public name: string;
  public dateStart: Date;
  public dateFinish: Date;
  public status: Classifier;
  public stage: StageModel;
  public serviceOrder: ServiceOrderModel;

}

export class TaskUserModel{
  public  id: number;
  public  task: TaskModel;
	public  user: number;
	public  name: string;
	public  status: Classifier;
	public  dateStart: Date;
	public  dateFinish: Date;
  public  statusAux: Classifier;
  
}