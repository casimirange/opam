import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor(private http: HttpClient) { }

  createUnit(store: any): Observable<any>{
    return this.http.post<any>(environment.unit, store)
  }

  getUnit(): Observable<any>{
    return this.http.get<any>(environment.unit)
  }

  getUnitByInternalref(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.unit + `/${internalRef}`)
  }

  //liste des unités par magasin
  getUnitByStore(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.unit + `/store/${internalRef}`)
  }

  deleteUnit(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.unit+`/${internalref}`)
  }

  updateUnit(store: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.unit+`/${internalRef}`, store);
  }
}
