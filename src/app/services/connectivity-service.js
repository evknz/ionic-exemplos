var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Network } from '@ionic-native/Network';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
var ConnectivityService = (function () {
    function ConnectivityService(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('Cordova');
        console.log('on device: ', this.onDevice);
    }
    ConnectivityService.prototype.isOnline = function () {
        if (this.onDevice && navigator.onLine) {
            return navigator.onLine !== Connection.NONE;
        }
        else {
            return navigator.onLine;
        }
    };
    ConnectivityService.prototype.isOffline = function () {
        if (this.onDevice && navigator.onLine) {
            return navigator.onLine === Connection.NONE;
        }
        else {
            return !navigator.onLine;
        }
    };
    ConnectivityService.prototype.isCordova = function () {
        return this.onDevice;
    };
    return ConnectivityService;
}());
ConnectivityService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Platform, Network])
], ConnectivityService);
export { ConnectivityService };
//# sourceMappingURL=connectivity-service.js.map