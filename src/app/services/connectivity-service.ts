import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

declare var Connection: any;

@Injectable()
export class ConnectivityService {

    onDevice: boolean;

    constructor(private platform: Platform) {
        this.onDevice = !this.platform.is('mobileweb') && !this.platform.is('core');
    }

    isOnline(): boolean {
        if (this.onDevice && navigator.onLine) {
            return navigator.onLine !== Connection.NONE;
        } else {
            return navigator.onLine;
        }
    }

    isOffline(): boolean {
        if (this.onDevice && navigator.onLine) {
            return navigator.onLine === Connection.NONE;
        } else {
            return !navigator.onLine;
        }
    }

    isAndroid(): boolean {
        return this.onDevice;
    }

    isNative(): boolean {
        return !this.platform.is('mobileweb') && !this.platform.is('core');
    }


}
