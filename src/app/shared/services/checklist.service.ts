import { Injectable } from "@angular/core";

import { DefaultHttpService } from "./default-http.service";

import { CheckListModel } from './../models/checklist.model';

@Injectable({ providedIn: "root" })
export class CheckListService {
    constructor(private http: DefaultHttpService) { }

    getById(id: number) {
        return this.http.get<CheckListModel>(`/protected/checklist/${id}`);
    }

    getAnswerByChecklist(id: number) {
        return this.http.get(`/protected/checklist/answerByChecklist/${id}`)
    }

}