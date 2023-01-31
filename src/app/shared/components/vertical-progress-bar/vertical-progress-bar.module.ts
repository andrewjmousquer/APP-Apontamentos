import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerticalProgressBarComponent } from './vertical-progress-bar.component';

@NgModule({
    declarations: [
        VerticalProgressBarComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        VerticalProgressBarComponent
    ]
})
export class VerticalProgressBarModule {
}
