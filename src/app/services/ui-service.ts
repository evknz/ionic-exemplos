import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {

    success: string = "";
    danger: string = "";
    mostrarDica: boolean;

    constructor(private toastCtrl: ToastController) {

    }

    toast(message: string, timeout: number = 3000, position: string = 'bottom'): void {
        let toast = this.toastCtrl.create({
            message: message,
            duration: timeout,
            position: position
        });

        toast.present();
    }

}
