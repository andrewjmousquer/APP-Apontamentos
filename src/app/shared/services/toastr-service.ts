import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { User } from '../models/user.model';
import { DefaultHttpService } from './default-http.service';


@Injectable({ providedIn: 'root' })
export class ToastrService {
  constructor(private toastController: ToastController) { }

  async showMessage(message, color, position) {
    /**
    * @param Color: 'success' | 'warning' | 'danger
    * @param Position: 
    */
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color != undefined && color != null ? color : 'danger',
      position: position != undefined && position != null ? position : 'top',
    });

    toast.present();
  }

}