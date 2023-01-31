import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceOrderModalPageRoutingModule } from './service-order-modal-routing.module';

import { ServiceOrderModalPage } from './service-order-modal.page';
import { ChecklistModule } from '../checklist/checklist.module';
import { NonComplianceModalPageModule } from '../non-complience-modal/non-complience-modal.module';
import { MovimentsModalPageModule } from '../moviments-modal/moviments-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceOrderModalPageRoutingModule,
    ReactiveFormsModule,
    ChecklistModule,
    NonComplianceModalPageModule,
    MovimentsModalPageModule
  ],
  declarations: [ServiceOrderModalPage]
})
export class ServiceOrderModalPageModule {}
