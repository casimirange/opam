import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  createStation(storeHouse: any): Observable<any>{
    return this.http.post<any>(environment.station, storeHouse)
  }

  getStations(): Observable<any>{
    return this.http.get<any>(environment.station)
  }

  getAllStationWithPagination(page: number, size: number): Observable<any>{
    return this.http.get<any>(environment.station+ `?page=${page}&size=${size}`)
  }

  updateStation(storeHouse: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.station+`/${internalRef}`, storeHouse)
  }

  deleteStation(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.station+`/${internalref}`)
  }

  getStationByInternalref(internalref: number): Observable<any>{
    return this.http.get<any>(environment.station+`/${internalref}`)
  }
}
