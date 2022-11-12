import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "../../_interfaces/products";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  saveProduct(product: Products): Observable<any>{
    return this.http.post<any>(environment.product, product)
  }

  getProducts(idOrder: number): Observable<any>{
    return this.http.get<any>(environment.product + `/order/${idOrder}`,)
  }
}
