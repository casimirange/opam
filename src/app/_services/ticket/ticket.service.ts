import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  //liste des tickets par demande d'opposition
  getTicketByRequestOpposition(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.ticket + `/requestopposition/${internalRef}`)
  }
}
