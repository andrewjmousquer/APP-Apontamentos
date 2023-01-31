import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceOrderPage } from './service-order.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceOrderPageRoutingModule {}
