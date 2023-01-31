import { Injectable } from "@angular/core";

import { DefaultHttpService } from "./default-http.service";

import { ServiceOrderModel } from "src/app/shared/models/service-order.model";
import { ServiceOrderDashboardModel } from "../models/service-order-dashboard.model";

@Injectable({ providedIn: "root" })
export class ServiceOrderService {
  constructor(private http: DefaultHttpService) {}

  search(model: ServiceOrderModel) {
    return this.http.post(`/protected/task/search`, model);
  }

  getAll() {
    return this.http.get<ServiceOrderModel>(`/protected/service-order/listAll`);
  }

  getById(id: number) {
    return this.http.get<ServiceOrderDashboardModel>(`/protected/service-order/${id}`);
  }
}
