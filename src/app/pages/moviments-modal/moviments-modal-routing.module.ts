import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimentsModalPage } from './moviments-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MovimentsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimentsModalPageRoutingModule { }
