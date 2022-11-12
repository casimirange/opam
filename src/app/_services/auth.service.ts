import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {ICredentials} from "../_interfaces/credentials";
import {IToken} from "../_interfaces/token";
import {ICredentialsSignup, ISignup} from "../_interfaces/signup";
import {catchError, tap} from "rxjs/operators";
import {CustomResponseLogin} from "../_interfaces/custom-response-login";
import {CustomResponseSignup} from "../_interfaces/custom-response-signup";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: ICredentials): Observable<IToken>{
    return this.http.post<IToken>(environment.signin, credentials);
  }

  login$ = (credentials: ICredentials) => <Observable<any>> this.http.post<any>(environment.signin, credentials)
    .pipe(tap(console.log), catchError(this.handleError));

  signup$ = (credentials: ICredentialsSignup) => <Observable<CustomResponseSignup>> this.http.post<CustomResponseSignup>(environment.signup, credentials)
    .pipe(tap(console.log), catchError(this.handleError));


  signup(credentials: any): Observable<any>{
    return this.http.post<any>(environment.signup, credentials);
  }

  verifyOtp(code: string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("code",code);
    return this.http.get<any>(environment.verification, {params:queryParams});
  }

  newOtpCode(newParam: any): Observable<any>{
    return this.http.post<any>(environment.sendOtp, newParam);
  }

  // pour capturer les messages d'erreur provenant du serveur (backend)
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured - Error code: ${error.status}`);
  }
}
