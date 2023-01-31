import { CheckListGroupModel } from "./checklist-group.model";

export class CheckListModel {
  public id: number;
  public name: string;
  public descrition: string;
  public priorityOrder: string;
  public tag: string;
  public groups: CheckListGroupModel[];
}
