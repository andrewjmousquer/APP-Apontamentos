import { CheckListModel } from './checklist.model';
import { StageMovimentsModel } from "./stage-moviments.model";
import { Checkpoint } from "./checkpoint.model";

export class StageModel {
  public id: number;
  public name: string;
  public task: boolean;
  public special: boolean;
  public statusJiraID: number;
  public checkpoint: Checkpoint;
  public checklist: CheckListModel;
  public moviments: StageMovimentsModel[];
}
