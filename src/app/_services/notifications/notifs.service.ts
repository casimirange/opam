import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import  Swal from 'sweetalert2/dist/sweetalert2.js';
import {TokenService} from "../token/token.service";
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
  constructor(private tokenService: TokenService) { }

  onDefault(message: string): void{
    Toast.fire({
        title: message,
        icon: 'info',
      });
  }

  onError(message: string, title: string): void{
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
      }
    })
  }
}
