import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_services/auth.service";
import {TokenService} from "../../../_services/token/token.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  otp!: string;
  inputDigitLeft: string = "Verifier le code";
  btnStatus: string = "btn-light";
  timer: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  sendNewVerifyCode: boolean = false;
  userEmail: string = localStorage.getItem('email').toString()
  newOtp = {
    appProvider: '',
    email: ''
  }

  public conNumber = 3;

  public configOptions = {
    length: 4,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }

  constructor(private authService: AuthService, private token: TokenService, private notifService: NotifsService, private router: Router) {
  }

  ngOnInit() {
    // console.log(this.conNumber)
    const date = Date.parse(localStorage.getItem('exp').toString())
    console.log('d1',date)
    const date1 = new Date()
    console.log('d2',date1.getTime())
    this.timer = (date - date1.getTime())/1000
    console.log('temp', this.timer)
    setInterval(() => {
      if(this.timer > 0) {
        this.timer--;
        this.minutes = parseInt(((this.timer % 3600) / 60).toString());
        this.seconds = this.timer % 60;
      } else {
        // this.sendNewVerifyCode = true
      }
    },1000)
  }

  onOtpChange(event: any) {
    this.otp = event;
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + `${(this.configOptions.length - this.otp.length) > 1 ? " caractères restants" : ' caractère restant'}`;
      this.btnStatus = 'btn-light';
    }

    if(this.otp.length == this.configOptions.length) {
      this.inputDigitLeft = "Vérifier";
      this.btnStatus = 'btn-primary';
    }
  }

  verifier(){
    // console.log(this.otp)
    // console.log(this.token.getToken())


    // if (this.conNumber > 0){
      this.authService.verifyOtp(this.otp).subscribe(
        (resp) => {
          this.token.saveRefreshToken(resp.refreshToken);
          this.token.saveAuthorities(resp.roles)
          this.token.saveUserInfo(resp.user)
          console.log(resp)
          this.notifService.onSuccess(`Bienvenue `)
      //
        }, (error) => {
          console.log('error', error)
          this.inputDigitLeft = "Reéssayer";
          this.btnStatus = 'btn-danger';
          this.notifService.onError(error.error.message, 'échec de connexion')
        }
      )
    //   this.notifService.onError('try again', 'échec de connexion')
    // }
    // else if (this.conNumber == 0){
    //   this.notifService.onError('reconnectez-vous à nouveau', 'échec de connexion')
    //   // this.token.clearToken()
    // }


  }

  sendNewCode(){
    this.newOtp.appProvider = '';
    this.newOtp.email = localStorage.getItem('email').toString();
    this.authService.newOtpCode(this.newOtp).subscribe(
      (resp) => {
        // this.token.saveRefreshToken(resp.refreshToken);
        // this.token.saveAuthorities(resp.roles)
        // this.token.saveUserInfo(resp.user)
        // console.log(resp)
        this.sendNewVerifyCode = false;
        this.notifService.onSuccess(`Nouveau code envoyé`)
        //
      }, (error) => {
        console.log('error', error)
        this.inputDigitLeft = "Vérifier";
        this.btnStatus = 'btn-danger';
        this.notifService.onError(error.error.message, 'échec de connexion')
      }
    )
  }

}
