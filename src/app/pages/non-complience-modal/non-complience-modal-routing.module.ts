import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonComplianceModalPage } from './non-complience-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NonComplianceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonComplianceModalPageRoutingModule { }
