import { CheckListAnswerModel } from './checklist-answer.model';
import { Classifier } from './classifier.model';
export class CheckListQuestionModel {
  public id: number;
  public question: string;
  public creationDate: Date;
  public active: boolean;
  public cklId: number;
  public answer: CheckListAnswerModel;

}
