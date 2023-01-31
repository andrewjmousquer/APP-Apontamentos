import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDataComponent } from './basic-data.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { DirectivesModule } from '../../directives/directives.module';
import { CepDirectiveDirective } from '../../directive/cep-mask.directive';

@NgModule({
    declarations: [
        BasicDataComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        FormsModule,
        MatStepperModule,
        DirectivesModule
    ],
    exports: [
        BasicDataComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BasicDataModule {
}
