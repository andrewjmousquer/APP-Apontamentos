import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appIntegerInput]'
})
export class NumberOnlyInputDirective {

    constructor() { }

    @HostListener('keypress', ['$event'])
    onInput(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.which ? event.which : event.keyCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
            return false;
        }
        return true;
    }

}