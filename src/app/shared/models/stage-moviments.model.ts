import { StageModel } from "./stage.model";
import { Classifier } from "./classifier.model";
export class StageMovimentsModel {
  public id: number;
  public jiraID: number;
  public type: Classifier;
  public name: string;
  public icon: string;

  public stage: StageModel;
}
