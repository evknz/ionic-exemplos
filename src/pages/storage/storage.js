var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the StoragePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var StoragePage = (function () {
    function StoragePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    StoragePage.prototype.nextPage = function (index) {
        if (index === 1) {
            this.navCtrl.push(IndexedDBPage);
        }
        else if (index === 2) {
            this.navCtrl.push(SQLiteDBPage);
        }
    };
    StoragePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StoragePage');
    };
    return StoragePage;
}());
StoragePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-storage',
        templateUrl: 'storage.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], StoragePage);
export { StoragePage };
var IndexedDBPage = (function () {
    function IndexedDBPage() {
        var db = new AngularIndexedDB('myDb', 1);
    }
    return IndexedDBPage;
}());
IndexedDBPage = __decorate([
    Component({
        selector: "storage-indexeddb",
        templateUrl: "storage-indexeddb.html"
    }),
    __metadata("design:paramtypes", [])
], IndexedDBPage);
export { IndexedDBPage };
var SQLiteDBPage = (function () {
    function SQLiteDBPage() {
    }
    return SQLiteDBPage;
}());
SQLiteDBPage = __decorate([
    Component({
        selector: "storage-sqlite",
        templateUrl: "storage-sqlite.html"
    })
], SQLiteDBPage);
export { SQLiteDBPage };
//# sourceMappingURL=storage.js.map