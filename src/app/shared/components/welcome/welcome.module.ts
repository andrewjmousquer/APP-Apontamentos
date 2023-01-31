import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeComponent } from './welcome.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        WelcomeComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        WelcomeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WelcomeModule {
}
