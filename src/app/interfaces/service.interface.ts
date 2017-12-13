import { Observable } from 'rxjs/Observable';
export interface ServiceInterface<T> {
    findAll(): Promise<T[]>;
    getById(item): any;
    doCreate(item): any;
    doUpdate(item): any;
    doDelete(id): any;
    search(term: string): Observable<T[]>;

}