import {Component, OnInit} from '@angular/core';
import {NotifsService} from "./_services/notifications/notifs.service";
// import {ConnectionService} from "ng-connection-service";
// import {OnlineStatusService, OnlineStatusType} from "ngx-online-status";
import {fromEvent, merge, Observable, Observer} from "rxjs";
import {map} from "rxjs/operators";


// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener('mouseenter', Swal.stopTimer)
//     toast.addEventListener('mouseleave', Swal.resumeTimer)
//   }
// })

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
  constructor(private notifsService: NotifsService) {
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
