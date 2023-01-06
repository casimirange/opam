import { Injectable } from '@angular/core';
import {TokenService} from "../token/token.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
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

  constructor(private tokenService: TokenService, private router: Router, private _location: Location) { }

  onDefault(message: string): void{
    Toast.fire({
        title: message,
        icon: 'info',
      });
  }

  onError(message: string): void{
    Toast.fire({
      icon: 'error',
      text: message,
    });
  }

  onSuccess(message: string): void{
    Toast.fire({
        title: message,
        icon: 'success',
      // background: 'success'
      });
  }

  onWarning(message: string): void{
    Toast.fire({
        title: message,
        icon: 'warning',
      // background: 'success'
      });
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
      allowEscapeKey: false,
      focusConfirm: false,
      backdrop: `rgba(0, 0, 0, 0.4)`
    }).then((result) => {
      if (result.value) {
        this.tokenService.clearTokenExpired();
        localStorage.setItem('url', this.router.url)
      }
    })
  }
}
