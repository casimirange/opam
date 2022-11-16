import { Injectable } from '@angular/core';
import {Products} from "../../_interfaces/products";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Order} from "../../_interfaces/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  saveOrder(order: Order): Observable<any>{
    return this.http.post<any>(environment.order, order)
  }

  getOrders(): Observable<any>{
    return this.http.get<any>(environment.order,)
  }

  getOrderByRef(internalReference: number): Observable<any>{
    return this.http.get<any>(environment.order + `/${internalReference}`,)
  }

  getOrderByClient(clientInternalReference: number): Observable<any>{
    return this.http.get<any>(environment.order + `/client/${clientInternalReference}`,)
  }
}
