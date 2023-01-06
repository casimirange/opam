import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifsService} from "./_services/notifications/notifs.service";
// import {ConnectionService} from "ng-connection-service";
// import {OnlineStatusService, OnlineStatusType} from "ngx-online-status";
import {fromEvent, interval, merge, Observable, Observer, of, Subscription} from "rxjs";
import {filter, first, map, mapTo} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {NavigationStart, Router} from "@angular/router";
import {TokenService} from "./_services/token/token.service";
import {Location} from "@angular/common";
import {ConnectionService} from "ng-connection-service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'OPAM';
  i
  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
