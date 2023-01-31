import { StageModel } from './../models/stage.model';
import { Injectable } from "@angular/core";

import { DefaultHttpService } from "./default-http.service";

import { ServiceOrderModel } from "src/app/shared/models/service-order.model";

@Injectable({ providedIn: "root" })
export class StageService {
  constructor(private http: DefaultHttpService) { }

  getById(id: number) {
    return this.http.get<StageModel>(`/protected/stage/${id}`);
  }

  getAll() {
    return this.http.get<StageModel[]>(`/protected/stage/listAll`);
  }
}
