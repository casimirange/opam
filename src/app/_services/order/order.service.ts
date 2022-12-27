import { Injectable } from '@angular/core';
import {Products} from "../../_model/products";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Order} from "../../_model/order";
import {CustomResponse} from "../../_interfaces/custom-response";
import {Client} from "../../_model/client";
import {catchError} from "rxjs/operators";

export const httpOptions = {
  responseType: 'arraybuffer' as 'json'
};
export const data: FormData = new FormData();

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

  getOrdersWithPagination(page: number, size: number): Observable<any>{
    return this.http.get<any>(environment.order+ `?page=${page}&size=${size}`)
  }

  getOrderByRef(internalReference: number): Observable<any>{
    return this.http.get<any>(environment.order + `/${internalReference}`,)
  }



  getOrderByClient(clientInternalReference: number): Observable<any>{
    return this.http.get<any>(environment.order + `/client/${clientInternalReference}`,)
  }

  sendOrderByClient(clientInternalReference: number): Observable<any>{
    return this.http.get<any>(environment.order + `/export/excel/client/${clientInternalReference}`,)
  }

  denyOrder(internalReference: number, idManager: number, reason: string): Observable<any>{
    return this.http.post<any>(environment.order + `/cancel/${internalReference}?idManagerCoupon=${idManager}&reasonForCancellation=${reason}`, null)
  }

  getProforma(orderInternalReference: number): Observable<any>{
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(environment.order + `/invoice/${orderInternalReference}`, httpOptions)
  }

  getFile(orderInternalReference: number, type: string, docType: string): Observable<any>{
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(environment.order + `/file/${orderInternalReference}/downloadFile?type=${type}&docType=${docType}`, httpOptions)
  }

  getReçu(orderInternalReference: number, type: string): Observable<any>{
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(environment.order + `/document/${orderInternalReference}?type=${type}`,null, httpOptions)
  }

  acceptOrder(orderInternalReference: number, idFund: number, idPaymentMethod: number, paymentRef: string, docType: string, file: File): Observable<any>{
    const data: FormData = new FormData();
    data.append('file', file);
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(environment.order + `/accept/${orderInternalReference}?idFund=${idFund}&idPaymentMethod=${idPaymentMethod}&paymentReference=${paymentRef}&docType=${docType}`, data, httpOptions)
  }

  validOrder(orderInternalReference: number, idManagerCoupon: number, file: File): Observable<any>{
    const data: FormData = new FormData();
    data.append('file', file);
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(environment.order + `/valid/delivery/${orderInternalReference}?idManagerCoupon=${idManagerCoupon}`, data, httpOptions)
  }

  payOrder(orderInternalReference: number, idManagerCoupon: number): Observable<any>{
    return this.http.post<any>(environment.order + `/pay/${orderInternalReference}?idManagerCoupon=${idManagerCoupon}`, null)
  }

  deliveryOrder(orderInternalReference: number, idManagerCoupon: number): Observable<any>{
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(environment.order + `/delivery/${orderInternalReference}?idManagerCoupon=${idManagerCoupon}`, null, httpOptions)
  }

  /**
   *
   * @param page
   * @param size
   */

  orders$ = (page: number, size: number) => <Observable<CustomResponse<Order>>>
    this.http.get<CustomResponse<Order>>(environment.order + `?page=${page}&size=${size}`,)
      .pipe(catchError(this.handleError));

  addOrder$ = (order: Order) => <Observable<Order>>
    this.http.post<Order>(environment.order, order)
      .pipe(catchError(this.handleError));

  showOrder$ = (internalRef: number) => <Observable<Order>>
    this.http.get<Order>(environment.order+`/${internalRef}`)
      .pipe(catchError(this.handleError));

  clientOrders$ = (internalRef: number) => <Observable<CustomResponse<Order>>>
    this.http.get<CustomResponse<Order>>(environment.order+`/client/${internalRef}`)
      .pipe(catchError(this.handleError));

  sendMailOrder$ = (internalRef: number) => <Observable<Order>>
    this.http.get<Order>(environment.order+`/export/excel/client/${internalRef}`)
      .pipe(catchError(this.handleError));

  denyOrder$ = (internalReference: number, idManager: number, reason: string) => <Observable<Order>>
    this.http.post<Order>(environment.order + `/cancel/${internalReference}?idManagerCoupon=${idManager}&reasonForCancellation=${reason}`, null)
      .pipe(catchError(this.handleError));

  proforma$ = (internalReference: number) => <Observable<Order>>
    this.http.get<Order>(environment.order + `/invoice/${internalReference}`, httpOptions)
      .pipe(catchError(this.handleError));

  file$ = (orderInternalReference: number, type: string, docType: string) => <Observable<Order>>
    this.http.get<Order>(environment.order + `/file/${orderInternalReference}/downloadFile?type=${type}&docType=${docType}`, httpOptions)
      .pipe(catchError(this.handleError));

  reçu$ = (orderInternalReference: number, type: string) => <Observable<Order>>
    this.http.post<Order>(environment.order + `/document/${orderInternalReference}?type=${type}`,null, httpOptions)
      .pipe(catchError(this.handleError));

  acceptOrder$ = (orderInternalReference: number, idFund: number, idPaymentMethod: number, paymentRef: string, docType: string, file: File) => {
    data.append('file', file);
    <Observable<Order>>
    this.http.post<Order>(environment.order + `/accept/${orderInternalReference}?idFund=${idFund}&idPaymentMethod=${idPaymentMethod}&paymentReference=${paymentRef}&docType=${docType}`, data, httpOptions)
      .pipe(catchError(this.handleError));}

  validOrder$ = (orderInternalReference: number, idManagerCoupon: number, file: File) => {
    data.append('file', file);
    <Observable<Order>>
    this.http.post<Order>(environment.order + `/valid/delivery/${orderInternalReference}?idManagerCoupon=${idManagerCoupon}`, data, httpOptions)
      .pipe(catchError(this.handleError));}

  deliveryOrder$ = (orderInternalReference: number, idManagerCoupon: number) => {
    <Observable<Order>>
      this.http.post<Order>(environment.order + `/delivery/${orderInternalReference}?idManagerCoupon=${idManagerCoupon}`, null, httpOptions)
      .pipe(catchError(this.handleError));}

  payOrder$ = (orderInternalReference: number, idManagerCoupon: number) => <Observable<Order>>
    this.http.post<Order>(environment.order + `/pay/${orderInternalReference}?idManagerCoupon=${idManagerCoupon}`, null)
      .pipe(catchError(this.handleError));

  handleError(error: HttpErrorResponse): Observable<never>{
    return throwError(`Une erreur est survenue: ${error.error.message.toString().bold()}` )
  }
}
