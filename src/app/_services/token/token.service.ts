import { Injectable } from '@angular/core';
import {IToken} from "../../_model/token";
import {Router} from "@angular/router";
import {Signup} from "../../_model/signup";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: string[] = [];
  constructor(private router: Router,) { }

  saveToken(token: IToken){
    localStorage.setItem('bearerToken', token.access_token);
    localStorage.setItem('username', token.username);
    localStorage.setItem('email', token.email);
    localStorage.setItem('Roles', JSON.stringify(token.roles));
    localStorage.setItem('uid', token.id);
    this.router.navigate(['/dashboard'])
  }

  public saveAuthorities(authorities: string[]) {
    localStorage.setItem('Roles', JSON.stringify(authorities));
  }

  clearToken(): void{
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('username');
    localStorage.removeItem('Roles');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('uid')
    this.router.navigate(['auth']);
  }

  clearTokenExpired(): void{
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('phone')
    localStorage.removeItem('uid')
    localStorage.removeItem('Roles')
    this.router.navigate(['auth']);
  }

  isLogged(): boolean{
    const token = localStorage.getItem(('bearerToken'))
    return !! token;
  }

  getToken(): string | null{
    return localStorage.getItem('bearerToken');
  }

}
