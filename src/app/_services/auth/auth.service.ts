import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {Signup} from "../../_model/signup";
import {catchError, tap} from "rxjs/operators";
import {IToken} from "../../_model/token";
import {Signin} from "../../_model/signin";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login$ = (credentials: Signin) => <Observable<IToken>> this.http.post<Signin>(environment.signin, credentials)
    .pipe(tap(console.log), catchError(this.handleError));

  signup$ = (credentials: Signup) => <Observable<Signup>> this.http.post<Signup>(environment.signup, credentials)
    .pipe(tap(console.log), catchError(this.handleError));

  // pour capturer les messages d'erreur provenant du serveur (backend)
  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(`An error occured - Message: ${error.error.message}`);
  }
}
