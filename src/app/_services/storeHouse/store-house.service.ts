import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StoreHouseService {

  constructor(private http: HttpClient) { }

  createStoreHouse(storeHouse: any): Observable<any>{
    return this.http.post<any>(environment.storeHouse, storeHouse)
  }

  getStoreHouses(): Observable<any>{
    return this.http.get<any>(environment.storeHouse)
  }

  getStoreHousesByStore(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.storeHouse + `/store/${internalRef}`)
  }

  updateStoreHouse(storeHouse: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.storeHouse+`/${internalRef}`, storeHouse)
  }

  deleteStoreHouse(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.storeHouse+`/${internalref}`)
  }
}
