import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "../../_interfaces/products";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {RequestOpposition} from "../../_interfaces/requestOpposition";

@Injectable({
  providedIn: 'root'
})
export class OppositionService {

  constructor(private http: HttpClient) { }

  saveOppositionRequest(product: RequestOpposition): Observable<any>{
    return this.http.post<any>(environment.requestOpposition, product)
  }

  validOppositionRequest(internalRef: number): Observable<any>{
    return this.http.post<any>(environment.requestOpposition+`/${internalRef}`, null)
  }

  getRequestByInternalRef(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.requestOpposition+`/${internalRef}` )
  }

  getOppositionRequest(page: number, size: number): Observable<any>{
    return this.http.get<any>(environment.requestOpposition+`?page=${page}&size=${size}`,)
  }
}
