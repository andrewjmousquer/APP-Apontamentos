import { CheckListQuestionModel } from "./checklist-question.model";
export class CheckListGroupModel {
  public ckgId: number;
  public name: string;
  public questions: CheckListQuestionModel[];
  public answered: number;
}
