import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  createCoupon(coupon: any): Observable<any>{
    return this.http.post<any>(environment.coupon, coupon)
  }

  getCoupons(page: number, size: number): Observable<any>{
    return this.http.get<any>(environment.coupon+`?page=${page}&size=${size}`)
  }

  updateCoupon(coupon: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.coupon+`/${internalRef}`, coupon)
  }

  deleteCoupon(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.coupon+`/${internalref}`)
  }
}
