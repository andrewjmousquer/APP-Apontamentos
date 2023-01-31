import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
    selector: 'app-finger-signature',
    templateUrl: './finger-signature.component.html',
    styleUrls: ['./finger-signature.component.scss'],
})
export class FingerSignatureComponent implements OnInit {

    @Output() savedImage = new EventEmitter<any>();

    @ViewChild('canvas', { static: true }) signaturePadElement;
    signaturePad: any;
    canvasWidth: number;
    canvasHeight: number;


    @Input() maxValue = 100;
    @Input() currentValue = 0;
    base64ToGallery: any;

    constructor(private elementRef: ElementRef, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.init();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.init();
    }

    init() {
        const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 140;
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
    }

    public ngAfterViewInit(): void {
        this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
        this.signaturePad.clear();
        this.signaturePad.penColor = 'rgb(56,128,255)';
        this.cd.detectChanges();
    }


    save(): void {
        const img = this.signaturePad.toDataURL();
        fetch(img)
            .then(res => res.blob())
            .then(blob => this.savedImage.emit(blob));
    }

    isCanvasBlank(): boolean {
        if (this.signaturePad) {
            return this.signaturePad.isEmpty() ? true : false;
        }
    }

    clear() {
        this.signaturePad.clear();
    }


    undo() {
        const data = this.signaturePad.toData();
        if (data) {
            data.pop();
            this.signaturePad.fromData(data);
        }
    }

}
