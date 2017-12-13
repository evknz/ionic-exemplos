var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
var UIService = (function () {
    function UIService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    UIService.prototype.toast = function (message, timeout, position) {
        if (timeout === void 0) { timeout = 10000; }
        if (position === void 0) { position = 'bottom'; }
        //if (message == null) return;
        var toast = this.toastCtrl.create({
            message: message,
            duration: timeout,
            position: position
        });
        toast.present();
    };
    return UIService;
}());
UIService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ToastController])
], UIService);
export { UIService };
//# sourceMappingURL=ui-service.js.map