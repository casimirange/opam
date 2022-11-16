import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../../_services/clients/client.service";
import {IClient, TypeClient} from "../../../_interfaces/client";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../_services/order/order.service";
import {Order} from "../../../_interfaces/order";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {Store} from "../../../_interfaces/store";
import {StoreService} from "../../../_services/store/store.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  client: IClient;
  name = ''
  refCli = ''
  date = ''
  internalRef = ''
  orders: Order[] = [];
  order: Order = new Order();
  stores: Store[] = [];
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router,
              private orderService: OrderService, private notifService: NotifsService, private storeService: StoreService) {
    this.client = new IClient()
  }

  ngOnInit(): void {
    this.getClientInfos()
    this.getStores()
    this.getClientOrders()
  }

  getClientInfos(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.clientService.findClient(params['id']).subscribe(
        res => {
          this.client = res;
          console.log(res)
        }
      )
    })
  }

  getClientOrders(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.orderService.getOrderByClient(params['id']).subscribe(
        res => {
          console.log(res)
          this.orders = res.content;
          console.log('orders', this.orders)
          this.notifService.onSuccess('chargement des commandes du client')
        }
      )
    })
  }

  getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.stores = resp.content
      },
      error => {
        this.notifService.onError(error.error.message, 'échec chargement magasins')
      }
    )
  }

}
