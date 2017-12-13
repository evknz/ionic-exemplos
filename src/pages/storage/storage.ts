import { Component, ViewChild } from '@angular/core';
import { DBService } from './../../app/services/indexeddb-contato-service';
import { FormGroup, NgForm } from '@angular/forms/';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import { SQLiteService } from './../../app/services/sqlite-contato-service';
import { UIService } from './../../app/services/ui-service';

/** 
 * Exemplo de código para uso de IndexedDB e SQLite 
 * em aplicações PWA (IndexedDB) ou Nativas (Android/iOS)
 *
 * Fonte indexedDB: https://github.com/gilf/angular2-indexeddb
 * Fonte SQLite: http://ionicframework.com/docs/native/sqlite/
 * 
 * Generated class for the StoragePage.
 * 
 * @author Everton Canez
 *
 */

@IonicPage()
@Component({
  selector: 'page-storage',
  templateUrl: 'storage.html',
})
export class StoragePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  nextPage(index: number): void {
    if (index === 1) {
      this.navCtrl.push(IndexedDBPage);
    } else if (index === 2) {
      this.navCtrl.push(SQLiteDBPage);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoragePage');
  }

}

@Component({
  selector: "storage-indexeddb",
  templateUrl: "storage-indexeddb.html"
})
export class IndexedDBPage {
  db: any;
  pessoa: any = {};
  pessoas: any;
  edicao: boolean = false;
  success: string = "";
  danger: string = "";
  show: boolean = false;
  dica: string = "";
  @ViewChild('myForm') myForm: FormGroup;
  private formStatus: boolean;

  constructor(private crudService: DBService, private uiservice: UIService) {
    this.refreshList();
    this.dica = "Este exemplo é mais indicado para projetos com foco em PWA (Progressive Web Apps), quando os requisitos do aplicativo apontam para a necessidade do usuário de operar em modo offline. O Indexed DB utiliza o espaço livre no disco do dispositivo do usuário."
  }

  ngOnInit() {
    this.myForm.valueChanges.subscribe(v => this.formStatus = this.myForm.dirty);
  }

  doCreate(data) {
    this.crudService.doCreate(data)
      .then((res) => {
        this.uiservice.toast("Item '" + res.value.name + "' cadastrado com sucesso!");
        this.refreshList();
      });

    this.markFormPristine(this.myForm);
    this.formStatus = this.myForm.dirty;
  }

  doRetrieve(where) {
    this.crudService.findAll()
      .then((pessoas) => {
        this.pessoas = pessoas;
      });
  }

  doUpdate(item) {
    this.crudService.doUpdate(item)
      .then((res) => {
        this.uiservice.toast("Item  atualizado com sucesso!");
        this.showSuccess("Item atualizado com sucesso!", this.success);
        this.refreshList();
      });
  }

  doDelete(item) {
    this.crudService.doDelete(item.id)
      .then((res) => {
        this.uiservice.toast("Item removido com sucesso!");
        this.showDanger("Item removido com sucesso!");
        this.refreshList();
      });
  }

  itemTapped(event, item) {
    this.pessoa = {};
    this.crudService.getById(item)
      .then((pessoa) => {
        this.pessoa = item;
        this.edicao = true;
      });
  }

  resetForm(): void {
    this.pessoa = { name: '', email: '' };
    this.edicao = false;
    this.markFormPristine(this.myForm);
  }

  refreshList() {
    this.crudService.findAll()
      .then((pessoas) => {
        this.pessoas = pessoas;
        this.resetForm();
      })
  }

  showSuccess(message: string, success: string): void {
    this.success = message;
    setTimeout(() => {
      this.success = "";
    }, 3000);
  }

  showDanger(message: string): void {
    this.danger = message;
    setTimeout(() => {
      this.danger = "";
    }, 3000);
  }

  showTip(show: boolean = true): void {
    this.show = show ? true : false;
  }

  private markFormPristine(form: FormGroup | NgForm): void {
    Object.keys(form.controls).forEach(control => {
      form.controls[control].markAsPristine();
    });
  }

}


@Component({
  selector: "storage-sqlite",
  templateUrl: "storage-sqlite.html"

})
export class SQLiteDBPage {

  pessoa: any = {};
  pessoas: any;
  edicao: boolean = false;
  success: string = "";
  danger: string = "";
  show: boolean = false;
  dica: string = "";
  @ViewChild('myForm') myForm: FormGroup;
  private formStatus: boolean;

  constructor(public uiservice: UIService, private platform: Platform, private sqliteService: SQLiteService) {
    this.dica = "Este exemplo é indicado para projetos com foco em aplicativos nativos. Aqueles em ionic que a aplicação web é empacotada em uma webview (Android ou iOS) e disponibilizada em uma loja oficial (Apple Store/Google Play).";
  }

  showTip(show: boolean = false): void {
    this.show = show ? true : false;
  }

  resetForm(): void {
    this.pessoa = { name: '', email: '' };
    this.edicao = false;
    this.markFormPristine(this.myForm);
  }

  private markFormPristine(form: FormGroup | NgForm): void {
    Object.keys(form.controls).forEach(control => {
      form.controls[control].markAsPristine();
    });
  }

  showSuccess(message: string, success: string): void {
    this.success = message;
    setTimeout(() => {
      this.success = "";
    }, 3000);
  }

  showDanger(message: string): void {
    this.danger = message;
    setTimeout(() => {
      this.danger = "";
    }, 3000);
  }



  doCreate(data) {
    this.platform.ready()
      .then(() => {
        this.sqliteService.doCreate(data)
          .then((res) => {
            this.uiservice.toast("Item '" + data.name + "' cadastrado com sucesso!");
            this.showSuccess("Item cadastrado com sucesso!", this.success);
            this.refreshList();
          })
          .catch((e) => {
            alert(e);
          });
      })
      .catch((e) => {
        alert(e);
      });
  }

  doUpdate(data) {
    this.platform.ready()
      .then(() => {
        this.sqliteService.doUpdate(data)
          .then((res) => {
            this.uiservice.toast("Item '" + data.name + "' atualizado com sucesso!");
            this.showSuccess("Item atualizado com sucesso!", this.success);
            this.refreshList();
          })
      })
  }

  doDelete(data) {
    this.platform.ready()
      .then(() => {
        this.sqliteService.doDelete(data.id)
          .then((res) => {
            this.uiservice.toast("Item removido com sucesso!");
            this.showDanger("Item removido com sucesso!");
            this.refreshList();
          })
      });
  }

  refreshList() {
    this.sqliteService.findAll()
      .then((pessoas) => {
        this.pessoas = pessoas;
        this.resetForm();
      })

  }

  itemTapped(event, item) {
    this.pessoa = {};
    this.sqliteService.getById(item)
      .then((pessoa) => {
        this.pessoa = item;
        this.edicao = true;
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad storageSqLite");
    this.refreshList();
  }
}
