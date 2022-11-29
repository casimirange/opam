import {Component, OnInit} from '@angular/core';
import {NotifsService} from "./_services/notifications/notifs.service";
// import {ConnectionService} from "ng-connection-service";
// import {OnlineStatusService, OnlineStatusType} from "ngx-online-status";
import {fromEvent, interval, merge, Observable, Observer} from "rxjs";
import {first, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
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
  source = interval(1000)
  constructor(private notifsService: NotifsService, private http: HttpClient) {
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


  }

  ngOnInit(): void {
    // this.notifsService.apiError.subscribe(
    //   data => {
    //     console.log(data)
    //     Toast.fire({
    //       icon: 'error',
    //       text: `${data}`,
    //       title: "Echec de connexion"
    //     })
    //   }
    // )
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
