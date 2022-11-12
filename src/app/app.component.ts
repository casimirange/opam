import {Component, OnInit} from '@angular/core';
import {NotifsService} from "./_services/notifications/notifs.service";
import  Swal from 'sweetalert2/dist/sweetalert2.js';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gulfin';

  constructor(private notifsService: NotifsService) {
  }

  ngOnInit(): void {
    this.notifsService.apiError.subscribe(
      data => {
        console.log(data)
        Toast.fire({
          icon: 'error',
          text: `${data}`,
          title: "Echec de connexion"
        })
      }
    )
  }

}
