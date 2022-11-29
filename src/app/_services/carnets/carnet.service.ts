import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarnetService {

  constructor(private http: HttpClient) { }

  createCarnet(carnet: any): Observable<any>{
    return this.http.post<any>(environment.carnet, carnet)
  }

  getCarnets(page: number, size: number): Observable<any>{
    return this.http.get<any>(environment.carnet+`?page=${page}&size=${size}`)
  }

  updateCarnet(carnet: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.carnet+`/${internalRef}`, carnet)
  }

  deleteCarnet(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.carnet+`/${internalref}`)
  }

  findCarnet(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.carnet+`/${internalRef}`)
  }
}
