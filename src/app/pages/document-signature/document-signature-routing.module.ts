import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentSignaturePage } from './document-signature.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentSignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentSignatureRoutingModule { }
