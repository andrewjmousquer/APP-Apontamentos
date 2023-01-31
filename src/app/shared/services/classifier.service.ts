import { Classifier } from './../models/classifier.model';
import { Injectable } from "@angular/core";
import { DefaultHttpService } from "./default-http.service";


@Injectable({ providedIn: "root" })
export class ClassifierService {
    constructor(private http: DefaultHttpService) { }

    listAll() {
        return this.http.get<Classifier[]>(`/protected/classifier/listAll`);
    }

    getByType(type: string) {
        return this.http.get<Classifier[]>(`/protected/classifier/searchByType/${type}`)
    }
}