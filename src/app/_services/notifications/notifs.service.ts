import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

import {TokenService} from "../token/token.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {BnNgIdleService} from "bn-ng-idle";
import {Location} from "@angular/common";
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Injectable({
  providedIn: 'root'
})
export class NotifsService {

  apiError = new Subject()
  private url: string;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  constructor(private tokenService: TokenService, private router: Router, private bnIdle: BnNgIdleService,
              private _location: Location) { }

  onDefault(message: string): void{
    Toast.fire({
        title: message,
        icon: 'info',
      });
  }

  onError(message: string, title: string): void{
    this.isLoading.next(false);
    Toast.fire({
      icon: 'error',
      text: message,
      title: title
    });
  }

  onSuccess(message: string): void{
    Toast.fire({
        title: message,
        icon: 'success',
      // background: 'success'
      });
  }

  sendError(message: string): void{
    this.apiError.next(message)
  }

  expiredSession(){

    Swal.fire({
      title: 'Déconnexion',
      html: 'Votre session est expirée, vous allez être redirigé vers la page d\'accueil',
      icon: 'info',
      footer: '<a >Veuillez vous reconnecter de nouveau</a>',
      showCancelButton: false,
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      focusConfirm: false,
      backdrop: `rgba(0, 0, 0, 0.4)`
    }).then((result) => {
      if (result.value) {
        this.tokenService.clearTokenExpired();
        // this.router.events.subscribe((val) => {
        //   console.log(this._location.path())
        //   this.url = this._location.path()
        // });
        // if (this.url != '/auth/login' && this.url != '/auth/otp') {
        //   this.bnIdle.resetTimer()
        // }
        localStorage.setItem('url', this.router.url)
      }
    })
  }
}
