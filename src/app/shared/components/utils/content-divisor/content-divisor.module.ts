import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentDivisorComponent } from './content-divisor.component';

@NgModule({
    declarations: [
        ContentDivisorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ContentDivisorComponent
    ]
})
export class ContentDivisorModule {
}
