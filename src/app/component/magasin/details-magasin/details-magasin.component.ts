import { Component, OnInit } from '@angular/core';
import {Order} from "../../../_interfaces/order";
import {Store} from "../../../_interfaces/store";
import {ClientService} from "../../../_services/clients/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../_services/order/order.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {StoreService} from "../../../_services/store/store.service";
import {StoreHouse} from "../../../_interfaces/storehouse";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {UnitsService} from "../../../_services/units/units.service";
import {Unite} from "../../../_interfaces/unite";
import {Location} from "@angular/common";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {VoucherService} from "../../../_services/voucher/voucher.service";

@Component({
  selector: 'app-details-magasin',
  templateUrl: './details-magasin.component.html',
  styleUrls: ['./details-magasin.component.css']
})
export class DetailsMagasinComponent implements OnInit {

  store: Store;
  name = ''
  refCli = ''
  date = ''
  internalRef = ''
  orders: Order[] = [];
  order: Order = new Order();
  storeHouses: StoreHouse[] = [];
  units: Unite[] = [];
  vouchers: TypeVoucher[] = [];
  roleUser = localStorage.getItem('userAccount').toString()
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router,
              private orderService: OrderService, private notifService: NotifsService, private storeService: StoreService,
              private storeHouseService: StoreHouseService, private unitService: UnitsService, private _location: Location,
              private voucherService: VoucherService) {
    this.store = new Store()
  }

  ngOnInit(): void {
    this.getStoreInfos()
    // this.getStores()
    this.getStoreHousesByStore()
    this.getUnitByStore()
    this.getVouchers()
  }

  getVouchers(){
    this.voucherService.getTypevoucher().subscribe(
      resp =>{
        this.vouchers = resp.content
      }
    )
  }

  getStoreInfos(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.storeService.getStoreByInternalref(params['id']).subscribe(
        res => {
          this.store = res;
          console.log(res)
        }
      )
    })
  }

  getStoreHousesByStore(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.storeHouseService.getStoreHousesByStore(parseInt(params['id'].toString())).subscribe(
        res => {
          console.log(res)
          this.storeHouses = res.content;
          console.log('orders', this.orders)
          this.notifService.onSuccess('chargement des commandes du client')
        }
      )
    })
  }

  getUnitByStore(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.unitService.getUnitByStore(parseInt(params['id'].toString())).subscribe(
        res => {
          console.log(res)
          this.units = res.content;
          console.log('orders', this.orders)
          this.notifService.onSuccess('chargement des unités du magasin')
        }
      )
    })
  }

  getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.storeHouses = resp.content
      },
      error => {
        this.notifService.onError(error.error.message, 'échec chargement magasins')
      }
    )
  }

  back() {
    this._location.back()
  }
}
