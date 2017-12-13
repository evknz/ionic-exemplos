import { IndexedDBPage, SQLiteDBPage, StoragePage } from './storage';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    StoragePage,
    IndexedDBPage,
    SQLiteDBPage
  ],
  imports: [
    IonicPageModule.forChild(StoragePage),
  ],
  exports: [
    StoragePage,
    IndexedDBPage,
    SQLiteDBPage
  ]
})
export class StorageModule { }
