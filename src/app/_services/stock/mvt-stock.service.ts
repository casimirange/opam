import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MvtStockService {

  constructor(private http: HttpClient) { }

  createStockMovement(stock: any): Observable<any>{
    return this.http.post<any>(environment.stock, stock)
  }

  deletStockMovement(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.stock+`/${internalref}`)
  }

  getStockMovement(): Observable<any>{
    return this.http.get<any>(environment.stock)
  }

  updateStockMovement(payment: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.stock+`/${internalRef}`, payment);
  }
}
