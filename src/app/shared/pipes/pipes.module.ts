import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { SafeHtmlPipe } from './safe-html/safe-html.pipe';
import { CPFPipe } from './cpf.pipe';
import { CurrencyFormatPipe } from './currency.pipe';

@NgModule({
    declarations: [
        SafeHtmlPipe,
        CPFPipe,
        CurrencyFormatPipe,],
    imports: [
        CommonModule
    ],
    exports: [
        SafeHtmlPipe,
        CPFPipe,
        CurrencyFormatPipe,
    ]
})
export class PipesModule {
}
