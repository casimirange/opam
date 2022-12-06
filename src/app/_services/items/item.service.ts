import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  createItem(store: any): Observable<any>{
    return this.http.post<any>(environment.item, store)
  }

  getItem(): Observable<any>{
    return this.http.get<any>(environment.item)
  }

  getItemByInternalref(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.item + `/${internalRef}`)
  }

  //liste des Items par entrepôt
  getItemByStoreHouse(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.item + `/storehouse/${internalRef}`)
  }

  deleteItem(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.item+`/${internalref}`)
  }

  updateItem(store: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.item+`/${internalRef}`, store);
  }
}
