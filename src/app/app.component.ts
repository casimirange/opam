import {Component, OnInit} from '@angular/core';
import {NotifsService} from "./_services/notifications/notifs.service";
// import {ConnectionService} from "ng-connection-service";
// import {OnlineStatusService, OnlineStatusType} from "ngx-online-status";
import {fromEvent, interval, merge, Observable, Observer} from "rxjs";
import {filter, first, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {BnNgIdleService} from "bn-ng-idle";
import {NavigationStart, Router} from "@angular/router";
import {TokenService} from "./_services/token/token.service";
import {Location} from "@angular/common";
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  // timer: 5000,
  timerProgressBar: true,
  // didOpen: (toast) => {
  //   toast.addEventListener('mouseenter', Swal.stopTimer)
  //   toast.addEventListener('mouseleave', Swal.resumeTimer)
  // }
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gulfin';
  status: string = ''
  isConnected: boolean
  // status1: OnlineStatusType; //Enum provided by ngx-online-status
  // onlineStatusCheck: any = OnlineStatusType;
  source = interval(3000)
  url: string;
  timer: number = 0;
  navStart: Observable<NavigationStart>
  constructor(private notifsService: NotifsService, private tokenService: TokenService, private _http: HttpClient,
              private bnIdle: BnNgIdleService, private router: Router, private _location: Location) {


    // this.source.subscribe(() => {
    //   this._http.get('https://www.google.com', { observe: 'response' })
    //     .pipe(first())
    //     .subscribe((resp: any) => {
    //       if (resp.status === 200 ) {
    //         console.log(true)
    //       } else {
    //         console.log(false)
    //       }
    //     }, err => console.log(err));
    // });

    // const checkOnlinestatus = async () => {
    //   try {
    //     const online = await fetch('./assets/images/logo.png');
    //     console.log('res',online)
    //     Toast.fire({
    //       title: 'en ligne',
    //       icon: 'question',
    //       iconHtml: '<img src="../assets/images/wifi.png" style="border-radius: 50px" width="25" height="25" >',
    //       customClass: {
    //         icon: 'no-border',
    //         image: 'no-border'
    //       },
    //     });
    //
    //     return online.status >= 200 && online.status < 300 ;
    //   }catch (e) {
    //     console.log(e)
    //       Toast.fire({
    //         title: 'hors connexion',
    //         // text: 'no connexion',
    //         // iconHtml: '<img src="../assets/images/wifi.png">',
    //         // customClass: {
    //         //   icon: 'no-border'
    //         // },
    //         imageUrl: './assets/images/wifi.png',
    //         imageWidth: 400,
    //         imageHeight: 200,
    //         imageAlt: 'Custom image',
    //         // background: 'error'
    //       });
    //
    //     return false;
    //   }
    // };
    //
    // setInterval(async () => {
    //   const result = await checkOnlinestatus();
    //   console.log("résultat", result)
    // }, 3000)

    // this.source.subscribe(() => {
    //   this.http.get('https://hover.blog/wp-content/uploads/2015/08/dot-online-1280x720.png', { observe: 'response' })
    //     .pipe(first())
    //     .subscribe(resp => {
    //       console.log('réponse', resp)
    //       if (resp.status === 200 ) {
    //         console.log(true)
    //       } else {
    //         console.log(false)
    //       }
    //     });
    // });

    // this.connectionService.monitor().subscribe(
    //   isConnect => {
    //     this.isConnected = isConnect
    //     if (this.isConnected){
    //       status = 'ONLINE'
    //       notifsService.onSuccess('connexion établie')
    //     }else {
    //       status = 'OFFLINE'
    //       notifsService.onError('Vous êtes hors réseau', '')
    //     }
    //     // alert(status)
    //   }
    // )
    //
    // this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
    //   // Retrieve Online status Type
    //   this.status1 = status;
    //   console.log('con', status)
    //
    // });
    //
    // const conn = (navigator as any).connection;
    // console.log('connexion', conn)
    // if (conn) {
    //   if (conn.saveData) {
    //     // do something
    //   }
    //   const connectionlist = ["slow-2g", "2g", "3g", "4g"];
    //   const effectiveType = conn.effectiveType;
    //   console.log(effectiveType);
    // }

    // this.createOnline$().subscribe(isOnline => console.log(isOnline));
    //
    // this.navStart = this.router.events.pipe(
    //   filter(evt => evt instanceof NavigationStart)) as Observable<NavigationStart>;

  }

  ngOnInit(): void {
    // this.navStart.subscribe( (res) => {
    //   console.log('navigation started', res)
    // })
    // this.router.events.subscribe((val) => {
    //   // console.log(this._location.path())
    //   this.url = this._location.path()
    // });
    // if (this.url != '/auth/login' && this.url != '/auth/otp'){
      //vérifier l'inactivité de l'utilisateur pendant 15 minutes puis le déconnecter
      // this.tokenService.userInactivity()
      // this.notifsService.expiredSession()
      // this.bnIdle.startWatching(10).subscribe((isTimedOut: boolean) => {
      //   if (isTimedOut) {
      //     this.bnIdle.stopTimer()
      //   }
      // });
    // }
  }


  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

}
