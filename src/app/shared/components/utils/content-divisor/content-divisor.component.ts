import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-content-divisor',
    templateUrl: './content-divisor.component.html',
    styleUrls: ['./content-divisor.component.scss'],
})
export class ContentDivisorComponent implements OnInit {

    @Input() text: string;

    constructor() {
    }

    ngOnInit() {
    }

}
