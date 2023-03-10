import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteDataPage } from './delete-data.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteDataPageRoutingModule { }
