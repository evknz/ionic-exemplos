import { Contato } from './../../pages/storage/contato-pessoa-model';
import { ServiceInterface } from './../interfaces/service.interface';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { Injectable } from '@angular/core';

@Injectable()
export class DBService implements ServiceInterface<Contato> {

    db: any = null;

    constructor() {
        this.db = this.open("myDb", 1);
    }

    findAll(): any {
        return this.getInstance()
            .then((people) => {
                return this.db.getAll('people')
                    .then((res) => {
                        return res;
                    });
            });
    };

    getById(item): any {
        return this.getInstance()
            .then((people) => {
                return this.db.getByKey('people', item.id)
                    .then((res) => {
                        Promise.resolve(res);
                        return res;
                    }, (error) => {
                        Promise.reject(error);
                    });
            });
    };

    doCreate(item): any {
        return this.getInstance()
            .then((pessoa) => {
                return this.db.add('people', item)
                    .then((res) => {
                        return res;
                    });
            });
    };

    doUpdate(item): any {
        return this.getInstance()
            .then((pessoa) => {
                return this.db.update('people', item)
                    .then((res) => {
                        return item;
                    });
            });
    };

    doDelete(id): any {
        return this.getInstance()
            .then((pessoa) => {
                return this.db.delete('people', id)
                    .then((res) => {
                        return res;
                    });
            });
    };

    search(term: string): any {
        console.log('Não implementado');
    }

    open(name: string, version: number): AngularIndexedDB {
        let db = new AngularIndexedDB(name, version);
        return db;
    };

    getInstance(): Promise<any> {
        return this.db.openDatabase(1, (evt) => {
            let objectStore = evt.currentTarget.result.createObjectStore(
                'people', { keyPath: "id", autoIncrement: true });
        
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("email", "email", { unique: true });

            console.log("banco mydb criado com sucesso!");
            console.log("tabela pessoa criada com sucesso!");

        });
    };
}