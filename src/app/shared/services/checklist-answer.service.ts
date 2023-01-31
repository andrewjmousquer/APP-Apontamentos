import { Injectable } from "@angular/core";

import { CheckListFactory } from './../../pages/checklist/checklist-factory';

import { DefaultHttpService } from './default-http.service';

import { CheckListAnswerModel } from './../models/checklist-answer.model';

@Injectable({ providedIn: "root" })
export class CheckListAnswerService {

    constructor(private http: DefaultHttpService,
        private cklFactory: CheckListFactory) { }

    saveOrUpdate(model, images: Blob, fileName: string) {
        const formToSend = new Blob([JSON.stringify(this.cklFactory.convertToInsert(model))], { type: "application/json" });
        const formData: FormData = new FormData();

        formData.append('dto', formToSend);
        if (images != null) {
            formData.append('file', images, fileName);
        }


        return this.http.post(`/protected/checklist-answer/save-upload`, formData);
    }

    getById(id: number) {
        return this.http.get<CheckListAnswerModel>(`/protected/checklist-answer/${id}`);
    }

}