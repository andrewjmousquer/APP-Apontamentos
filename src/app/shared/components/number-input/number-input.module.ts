import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { NumberInputComponent } from './number-input.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        NumberInputComponent,
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        NumberInputComponent
    ],
    providers: [
        CurrencyPipe
    ]
})
export class NumberInputModule {
}
