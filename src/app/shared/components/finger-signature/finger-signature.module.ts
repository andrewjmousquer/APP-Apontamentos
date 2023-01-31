import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FingerSignatureComponent } from './finger-signature.component';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        FingerSignatureComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        FingerSignatureComponent
    ]
})
export class FingerSignatureModule {
}
