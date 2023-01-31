import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent implements OnInit {

    private static BACKSPACE_KEY = 'Backspace';
    private static BACKSPACE_INPUT_TYPE = 'deleteContentBackward';

    @ViewChild('dummyFacade', {static: false}) private dummyFacade: IonInput;

    @Input() label: string;
    @Input() precision: number;
    @Input() amount: string;
    @Output() amountEntered = new EventEmitter<number>();
    @Output() clearData = new EventEmitter<number>();

    constructor(private currencyPipe: CurrencyPipe) {
    }

    ngOnInit() {
        if (this.amount && this.amount.trim() !== '') {
            this.amountEntered.emit(+this.amount);
        }
    }

    handleKeyUp(event: KeyboardEvent) {
        // this handles keyboard input for backspace
        if (event.key === NumberInputComponent.BACKSPACE_KEY) {
            this.delDigit();
        }
    }

    handleInput(event: CustomEvent) {
        this.clearInput();
        // check if digit
        if (event.detail.data && !isNaN(event.detail.data)) {
            this.addDigit(event.detail.data);
        } else if (event.detail.inputType === NumberInputComponent.BACKSPACE_INPUT_TYPE) {
            // this handles numpad input for delete/backspace
            this.delDigit();
        }
    }

    private addDigit(key: string) {
        if (this.amount.length <= 12) {
            this.amount = this.amount + key;
            this.amountEntered.emit(+this.amount);
        }
    }

    private delDigit() {
        this.amount = this.amount.substring(0, this.amount.length - 1);
        this.amountEntered.emit(+this.amount);
    }

    private clearInput() {
        this.dummyFacade.value = '';
        this.dummyFacade.getInputElement().then((native: HTMLInputElement) => {
            native.value = '';
        });
    }

    get formattedAmount(): string {
        return this.currencyPipe.transform(+this.amount / Math.pow(10, this.precision), 'R$');
    }

    openInput() {
        this.dummyFacade.setFocus().finally();
    }

}
