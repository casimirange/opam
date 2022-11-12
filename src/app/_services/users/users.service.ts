import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICredentials} from "../../_interfaces/credentials";
import {Observable} from "rxjs";
import {IToken} from "../../_interfaces/token";
import {environment} from "../../../environments/environment";
import {ISignup} from "../../_interfaces/signup";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get<any>(environment.users);
  }

  getUser(internalRef: number): Observable<any>{
    return this.http.get<any>(environment.users + `/${internalRef}`);
  }

  enableDesable(internalRef: number, status: number): Observable<any>{
    return this.http.put<any>(environment.users, internalRef+'/'+status);
  }

  updateUser(user: any): Observable<any>{
    return this.http.put<any>(environment.users, user);
  }

}
