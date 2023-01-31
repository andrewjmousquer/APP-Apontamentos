import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
    name: string;
    path: string;
    data: string;
}

@Component({
    selector: 'app-image-picker',
    templateUrl: './image-picker.component.html',
    styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

    images: LocalFile[] = [];
    image: LocalFile
    imageToSave: Blob;

    @Output() confirmar = new EventEmitter<any>();
    @Input() imagesShow: String;

    constructor(
        private plt: Platform,
        private http: HttpClient,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController
    ) { }

    async ngOnInit() {
        this.loadFiles('start')
    }

    ngAfterViewInit() {

    }

    async loadFiles(modo: string) {
        this.images = [];
        this.imageToSave = null;

        const loading = await this.loadingCtrl.create({
            message: 'Loading data...',
        });
        await loading.present();

        Filesystem.readdir({
            path: IMAGE_DIR,
            directory: Directory.Data,
        }).then(async result => {
            for (let f of result.files) {
                const filePath = `${IMAGE_DIR}/${f}`;

                const readFile = await Filesystem.readFile({
                    path: filePath,
                    directory: Directory.Data,
                });

                this.image = {
                    name: f,
                    path: filePath,
                    data: `data:image/jpeg;base64,${readFile.data}`,
                }

                this.images.push(this.image);
            }

            if (modo == 'insert') {
                this.startUpload(this.image)
            }
            if (modo == 'start') {
                this.images.forEach(e => {
                    this.deleteImage(e)
                });
            }

        },
            async (err) => {
                await Filesystem.mkdir({
                    path: IMAGE_DIR,
                    directory: Directory.Data,
                });
            }
        ).then(_ => {
            loading.dismiss();
        });
    }

    async presentToast(text) {
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 3000,
        });
        toast.present();
    }

    async selectImage() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        });

        if (image) {
            this.saveImage(image)
        }
    }

    async saveImage(photo: Photo) {
        const base64Data = await this.readAsBase64(photo);

        const fileName = new Date().getTime() + '.jpeg';
        const savedFile = await Filesystem.writeFile({
            path: `${IMAGE_DIR}/${fileName}`,
            data: base64Data,
            directory: Directory.Data
        });

        this.loadFiles('insert');
    }

    private async readAsBase64(photo: Photo) {
        if (this.plt.is('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path
            });

            return file.data;
        }
        else {
            const response = await fetch(photo.webPath);
            const blob = await response.blob();

            return await this.convertBlobToBase64(blob) as string;
        }
    }

    convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
    async startUpload(file: LocalFile) {
        const response = await fetch(file.data);
        const blob = await response.blob();
        this.imageToSave = blob
        this.confirmar.emit({ imageToSave: this.imageToSave, modo: 'insert' })
    }

    async deleteImage(file: LocalFile) {
        await Filesystem.deleteFile({
            directory: Directory.Data,
            path: file.path
        });
        this.confirmar.emit({ imageToSave: this.imageToSave, modo: 'delete' })

        this.loadFiles('');
    }
}
