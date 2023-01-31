import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ServiceOrderPageRoutingModule } from "./service-order-routing.module";

import { ServiceOrderPage } from "./service-order.page";
import { ServiceOrderModalPageModule } from "../service-order-modal/service-order-modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceOrderPageRoutingModule,
    ReactiveFormsModule,
    ServiceOrderModalPageModule
  ],
  declarations: [ServiceOrderPage],
})
export class ServiceOrderPageModule {}
