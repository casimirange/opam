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
import Swal from "sweetalert2";
import {StatusService} from "../../../_services/status/status.service";
export class Un{
  cp: number
  qtc: number
  qtn: number
}
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
  unit: Unite = new Unite();
  unit1: Unite = new Unite();
  unit2: Unite = new Unite();
  vouchers: TypeVoucher[] = [];
  vouchers1: TypeVoucher[] = [];
  vouchers2: TypeVoucher[] = [];
  all: Un[] = []
  roleUser = localStorage.getItem('userAccount').toString()
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router,
              private orderService: OrderService, private notifService: NotifsService, private storeService: StoreService,
              private storeHouseService: StoreHouseService, private unitService: UnitsService, private _location: Location,
              private voucherService: VoucherService, private statusService: StatusService, ) {
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
        this.vouchers1 = resp.content
        this.vouchers2 = resp.content
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
      this.storeService.getUnitByStore(parseInt(params['id'].toString())).subscribe(
        resp => {
          this.units = resp;
          console.log('deteail',this.units)
        }
      )

    //   this.unitService.getUnitByStore(parseInt(params['id'].toString())).subscribe(
    //     res => {
    //       console.log('units',res)
    //       let ten, fap, tre ;
    //       let v1, v2, v3 ;
    //
    //       const mp = new Un()
    //       const mp1 = new Un()
    //       const mp2 = new Un()
    //       setTimeout(() =>{
    //         v1  =  this.vouchers.find(value => value.amount == 10000).internalReference
    //         v2  =  this.vouchers1.find(value => value.amount == 5000).internalReference
    //         v3  =  this.vouchers2.find(value => value.amount == 3000).internalReference
    //
    //       ten = res.content.filter(x => x.idTypeVoucher == v1)
    //       fap = res.content.filter(y => y.idTypeVoucher == v2)
    //       tre = res.content.filter(z => z.idTypeVoucher == v3)
    //       let i = 0;
    //       let j = 0;
    //       let k = 0;
    //       for (let t of ten){
    //         i += t.quantityNotebook
    //       }
    //       // this.unit.voucher = 10000
    //       mp.cp = 10000
    //       mp.qtn = i
    //       for (let f of fap){
    //         j += f.quantityNotebook
    //       }
    //       mp1.cp = 5000
    //       mp1.qtn = j
    //       for (let tr of tre){
    //         k += tr.quantityNotebook
    //       }
    //       mp2.cp = 3000
    //       mp2.qtn = k
    //       }  , 1000);
    //       this.all.push(mp)
    //       this.all.push(mp1)
    //       this.all.push(mp2)
    //
    //       // this.units = res.content;
    //       // console.log('unités', this.units)
    //       this.notifService.onSuccess('chargement des unités du magasin')
    //     }
    //   )
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

  getStatuts(status: string): string {
    return this.statusService.allStatus(status)
  }
}
