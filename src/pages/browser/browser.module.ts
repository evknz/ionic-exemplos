import { BrowserPage } from './browser';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    BrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowserPage)
  ],
  exports: [
    BrowserPage
  ]
})
export class BrowserPageModule { }
