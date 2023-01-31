import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-vertical-progress-bar',
    templateUrl: './vertical-progress-bar.component.html',
    styleUrls: ['./vertical-progress-bar.component.scss'],
})
export class VerticalProgressBarComponent implements OnInit {

    @Input() maxValue = 100;
    @Input() currentValue = 0;

    constructor() {
    }

    ngOnInit() {
    }

}
