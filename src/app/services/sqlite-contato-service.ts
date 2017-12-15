import { ConnectivityService } from './connectivity-service';
import { Contato } from './../../pages/storage/contato-pessoa-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { ServiceInterface } from './../interfaces/service.interface';
import { SQLite } from '@ionic-native/sqlite';
import { UIService } from './ui-service';

declare var window: any;
@Injectable()
export class SQLiteService implements ServiceInterface<Contato>{

    public db = null;
    public arr = [];

    constructor(
        private sqlite: SQLite,
        private uiservice: UIService,
        private platform: Platform,
        private connectivityService: ConnectivityService
    ) {
        // abre o sqlite
        this.open("myDb.db");
    }

    findAll(): any {
        return new Promise(res => {
            this.platform.ready().then(() => {
                if (this.connectivityService.isNative()) {

                    this.arr = [];
                    let query = "SELECT * FROM People ORDER BY id DESC";
                    this.db.executeSql(query, [], rs => {
                        if (rs.rows.length > 0) {
                            for (var i = 0; i < rs.rows.length; i++) {
                                var item = rs.rows.item(i);
                                this.arr.push(item);
                            }
                        }
                        res(this.arr);
                    }, (e) => {
                        res(false);
                        alert('Erro ao carregar a lista: ' + e);
                    });

                } else {
                    res(false);
                }
            })
        })
    }

    getById(item): any {
        return new Promise(res => {
            this.arr = [];
            let query = "SELECT * FROM People WHERE id = ?";
            this.db.executeSql(query, [item.id], rs => {
                if (rs.rows.length > 0) {
                    for (var i = 0; i < rs.rows.length; i++) {
                        var item = rs.rows.item(i);
                        this.arr.push(item);
                    }
                }
                res(this.arr);
            }, (e) => {
                this.db.close();
                console.log('Erro ao recuperar o item da lista: ', e);
            });
        })
    }

    doCreate(item): any {
        return new Promise(resolve => {
            if (this.connectivityService.isNative()) {
                var InsertQuery = "INSERT INTO People (name, email) VALUES (?, ?)";
                this.db.executeSql(InsertQuery, [item.name, item.email]
                    , (success) => {
                        this.findAll()
                            .then(s => {
                                resolve(true)
                            });
                    }, error => {
                        this.uiservice.toast('Inserted Error.. ' + error);
                        resolve(false);
                    })
            } else {
                this.uiservice.toast("Acho que você não entendeu: Não vai funcionar ... ('YOU HAVE NO POWER HERE!!!')", 10000, 'bottom');
            }
        })
    }

    doUpdate(item): any {
        return new Promise(res => {
            var query = "UPDATE People SET name=?, email=?  WHERE id=?";
            this.db.executeSql(query, [item.name, item.email, item.id]
                , (success) => {
                    this.uiservice.toast('Inserted... Sucess.. ' + success);
                    this
                        .findAll()
                        .then(s => {
                            res(true);
                        });
                }, (error) => {
                    this.uiservice.toast('Updating Error.. ' + error);
                });
        })
    }

    doDelete(id): any {
        return new Promise(resolve => {
            var query = "DELETE FROM People WHERE id=?";
            this.db.executeSql(query, [id]
                , (success) => {
                    this.findAll()
                        .then(s => {
                            resolve(true);
                        });
                }, (error) => {
                    this.uiservice.toast("Deleting Error..." + error, 10000);
                });
        })
    }

    search(term: string): Observable<Contato[]> {
        return null;
    }

    open(dbname: string) {
        if (this.connectivityService.isNative()) {
            this.db = window.sqlitePlugin.openDatabase({ name: dbname, location: 'default' });
            this.db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS People (id integer primary key, name text, email text)');
            }, (e) => {
                this.uiservice.toast("Transtion Error!" + e, 10000, 'top');
            }, () => {
                //this.uiservice.toast("Datebase criado OK..!", 10000, 'top');
            })
        } else {
            this.uiservice.toast("Você deve rodar este exemplo e um dispositivo ou um emulador!", 10000, 'top');
        }
    };

}