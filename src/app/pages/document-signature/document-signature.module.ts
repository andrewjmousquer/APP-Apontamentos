import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentSignatureRoutingModule } from './document-signature-routing.module';

import { DocumentSignaturePage } from './document-signature.page';
import { FingerSignatureModule } from 'src/app/shared/components/finger-signature/finger-signature.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DocumentSignatureRoutingModule,
        ReactiveFormsModule,
        FingerSignatureModule
    ],
    declarations: [DocumentSignaturePage]
})
export class DocumentSignaturePageModule {
}
