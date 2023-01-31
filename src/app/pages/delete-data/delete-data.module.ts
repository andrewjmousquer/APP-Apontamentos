import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteDataPageRoutingModule } from './delete-data-routing.module';

import { DeleteDataPage } from './delete-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteDataPageRoutingModule
  ],
  declarations: [DeleteDataPage]
})
export class DeleteDataModule { }
