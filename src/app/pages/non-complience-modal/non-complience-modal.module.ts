import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NonComplianceModalPageRoutingModule } from './non-complience-modal-routing.module';

import { NonComplianceModalPage } from './non-complience-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NonComplianceModalPageRoutingModule
  ],
  declarations: [NonComplianceModalPage]
})
export class NonComplianceModalPageModule { }
