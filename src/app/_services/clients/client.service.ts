import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject, throwError} from "rxjs";
import {Client} from "../../_interfaces/client";
import {catchError, tap} from "rxjs/operators";
import {Clients} from "../../component/client/interface/clients";
import {CustomResponseCliennts} from "../../_interfaces/custom-response-cliennts";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any>{
    return this.http.get<any>(environment.client)
  }

  getAllClientsWithPagination(page: number, size: number): Observable<any>{
    return this.http.get<any>(environment.client+ `?page=${page}&size=${size}`)
  }

  searchClient(completeName: string): Observable<any>{
    return this.http.get<any>(environment.client+ '/search?name=' + completeName+ '&ref=0')
  }

  addClient(client: Client): Observable<Client>{
    return this.http.post<Client>(environment.client, client)
  }

  findClient(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.client+`/${internalRef}`)
  }

  deleteClient(internalref: number): Observable<any>{
    return this.http.delete<any>(environment.client+`/${internalref}`)
  }

  updatelient(client: any, internalRef: number): Observable<any>{
    return this.http.put<any>(environment.client+`/${internalRef}`, client);
  }

}
