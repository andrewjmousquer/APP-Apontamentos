import { CheckListAnswerModel, InsertEditCklAnswer } from './../../shared/models/checklist-answer.model';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CheckListFactory {
    constructor() { }

    public convertToInsert(modelAnswer) {
        let toReturn = new InsertEditCklAnswer();

        toReturn.id = modelAnswer.id != undefined && modelAnswer.id !== null ? modelAnswer.id : 0;
        toReturn.question = modelAnswer.question.id
        toReturn.comment = modelAnswer.comment != undefined && modelAnswer.comment !== null ? modelAnswer.comment : null;
        toReturn.task = modelAnswer.task;
        toReturn.answer = modelAnswer.answer.id;

        return toReturn;
    }

}