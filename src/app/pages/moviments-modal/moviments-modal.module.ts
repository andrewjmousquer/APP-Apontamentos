import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimentsModalPageRoutingModule } from './moviments-modal-routing.module';

import { MovimentsModalPage } from './moviments-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovimentsModalPageRoutingModule
  ],
  declarations: [MovimentsModalPage]
})
export class MovimentsModalPageModule { }
