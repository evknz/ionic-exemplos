import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/Geolocation';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageModule } from '../pages/storage/storage.module';
import { SQLite } from '@ionic-native/sqlite';
import { SQLiteService } from './services/sqlite-contato-service';
import { SQLiteDBPage, IndexedDBPage } from '../pages/storage/storage';
import { DBService } from './services/indexeddb-contato-service';
import { Network } from '@ionic-native/Network';
import { UIService } from './services/ui-service';
import { ConnectivityService } from './services/connectivity-service';
import { BrowserPage } from '../pages/browser/browser';
import { BrowserPageModule } from '../pages/browser/browser.module';

@NgModule({
  declarations: [
    BrowserPage,
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    StorageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BrowserPage,
    HomePage,
    ListPage,
    IndexedDBPage,
    SQLiteDBPage
  ],
  providers: [
    ConnectivityService,
    DBService,
    Geolocation,
    StatusBar,
    SplashScreen,
    SQLite,
    SQLiteService,
    Network,
    UIService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
