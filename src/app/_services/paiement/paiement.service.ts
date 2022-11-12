import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http: HttpClient) { }

  createPaymentMethod(store: any): Observable<any>{
    return this.http.post<any>(environment.paymentMethod, store)
  }

  deletePaymentMethod(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.paymentMethod+`/${internalref}`)
  }

  getPaymentMethods(): Observable<any>{
    return this.http.get<any>(environment.paymentMethod)
  }

  // getStoreByInternalref(internalRef: number): Observable<any>{
  //   return this.http.get<any>(environment.paymentMethod + `/${internalRef}`)
  // }
}
