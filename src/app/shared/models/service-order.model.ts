import { Classifier } from './classifier.model';
import { TaskModel } from "./task.model";

export class ServiceOrderModel {
  public id: number;
  public numberJira: number;
  public dateStart: Date;
  public dateFinish: Date;
  public statusOs: Classifier;
  public brand: string;
  public model: string;
  public plate: string;
  public chassi: string;
  public number: string;
}
