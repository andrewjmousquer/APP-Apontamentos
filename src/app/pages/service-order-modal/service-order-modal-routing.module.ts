import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceOrderModalPage } from './service-order-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceOrderModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceOrderModalPageRoutingModule {}
