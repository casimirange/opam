import { Component, OnInit } from '@angular/core';
import {Client} from "../../../_interfaces/client";
import {Order} from "../../../_interfaces/order";
import {Store} from "../../../_interfaces/store";
import {ClientService} from "../../../_services/clients/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../_services/order/order.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {StoreService} from "../../../_services/store/store.service";
import {RequestOpposition} from "../../../_interfaces/requestOpposition";
import {OppositionService} from "../../../_services/opposition/opposition.service";
import {Ticket} from "../../../_interfaces/ticket";
import {TicketService} from "../../../_services/ticket/ticket.service";

@Component({
  selector: 'app-details-request-opposition',
  templateUrl: './details-request-opposition.component.html',
  styleUrls: ['./details-request-opposition.component.css']
})
export class DetailsRequestOppositionComponent implements OnInit {

  request: RequestOpposition = new RequestOpposition();
  tickets: Ticket[] = [];
  roleUser = localStorage.getItem('userAccount').toString()
  constructor(private requestService: OppositionService, private activatedRoute: ActivatedRoute, private router: Router,
              private ticketService: TicketService, private notifService: NotifsService) {
  }

  ngOnInit(): void {
    this.getRequestInfos()
    this.getTicketsByRequestOpposition()
  }

  getRequestInfos(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.requestService.getRequestByInternalRef(params['id']).subscribe(
        res => {
          this.request = res;
          console.log(res)
        }
      )
    })
  }

  getTicketsByRequestOpposition(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.ticketService.getTicketByRequestOpposition(params['id']).subscribe(
        res => {
          console.log(res)
          this.tickets = res.content;
          this.notifService.onSuccess('chargement des tickets')
        }
      )
    })
  }

}
