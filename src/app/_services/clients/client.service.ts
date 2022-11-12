import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject, throwError} from "rxjs";
import {IClient} from "../../_interfaces/client";
import {catchError, tap} from "rxjs/operators";
import {Clients} from "../../component/client/interface/clients";
import {CustomResponseCliennts} from "../../_interfaces/custom-response-cliennts";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://localhost:8080/server';
  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any>{
    return this.http.get<any>(environment.client)
  }

  addClient(client: IClient): Observable<any>{
    return this.http.post<any>(environment.client, client)
  }

  findClient(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.client+`/ref/${internalRef}`)
  }

  clients$ = <Observable<CustomResponseCliennts>> this.http.get<CustomResponseCliennts>(environment.client)
    .pipe(tap(console.log), catchError(this.handleError));

  save$ = (Client: IClient) => <Observable<CustomResponseCliennts>> this.http.post<CustomResponseCliennts>(environment.client, Client)
    .pipe(tap(console.log), catchError(this.handleError));

  createClients(client: IClient): Observable<IClient>{
    return this.http.post<IClient>(environment.client, client);
  }

  updatelient(client: any, id: number): Observable<any>{
    return this.http.put<any>(this.url+`/${id}`, client);
  }

  // pour capturer les messages d'erreur provenant du serveur (backend)
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured - Error code: ${error.status}`);
  }
}
