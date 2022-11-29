import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TypeVoucher} from "../../_interfaces/typeVoucher";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Store} from "../../_interfaces/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  createStore(store: Store): Observable<Store>{
    return this.http.post<Store>(environment.store, store)
  }

  getStore(): Observable<any>{
    return this.http.get<any>(environment.store)
  }

  getStoreByInternalref(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.store + `/${internalRef}`)
  }

  //liste des entrepots par magasin
  getStoreHouseByStore(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.store + `/${internalRef}`)
  }

  deleteStore(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.store+`/${internalref}`)
  }

  updateStore(store: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.store+`/${internalRef}`, store);
  }
}
