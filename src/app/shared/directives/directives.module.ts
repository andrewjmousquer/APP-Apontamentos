import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfCnpjValidator } from '../validators/cpf-cnpj.validator';
import { ZipCodeValidator } from '../validators/zip-code.validator';
import { NumberOnlyInputDirective } from './number-only.directive';
import { CurrencyMaskDirective } from './currency.directive'


@NgModule({
    imports: [CommonModule],
    declarations: [
        NumberOnlyInputDirective,
        CurrencyMaskDirective,


    ],
    exports: [
        NumberOnlyInputDirective,
        CurrencyMaskDirective,

    ],
    providers: [CpfCnpjValidator, ZipCodeValidator]
})
export class DirectivesModule { }
