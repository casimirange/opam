import { Component, OnInit } from '@angular/core';
import {Store} from "../../../_model/store";
import {Order} from "../../../_model/order";
import {StoreHouse} from "../../../_model/storehouse";
import {Unite} from "../../../_model/unite";
import {ClientService} from "../../../_services/clients/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../_services/order/order.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {StoreService} from "../../../_services/store/store.service";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {UnitsService} from "../../../_services/units/units.service";
import {Location} from "@angular/common";
import {ItemService} from "../../../_services/items/item.service";
import {Piece} from "../../../_model/piece";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {TypeVoucher} from "../../../_model/typeVoucher";
import {CartonService} from "../../../_services/cartons/carton.service";
import {CarnetService} from "../../../_services/carnets/carnet.service";
import {Carton} from "../../../_model/carton";
import {Carnet} from "../../../_model/carnet";
import {Un} from "../../magasin/details-magasin/details-magasin.component";
import {StatusService} from "../../../_services/status/status.service";

@Component({
  selector: 'app-details-entrepot',
  templateUrl: './details-entrepot.component.html',
  styleUrls: ['./details-entrepot.component.css']
})
export class DetailsEntrepotComponent implements OnInit {

  store: Store;
  storeHouse: StoreHouse = new StoreHouse();
  name = ''
  refCli = ''
  date = ''
  internalRef = ''
  orders: Order[] = [];
  order: Order = new Order();
  items: Piece[] = [];
  item: Piece = new Piece();
  storeHouses: StoreHouse[] = [];
  vouchers: TypeVoucher[] = [];
  vouchers1: TypeVoucher[] = [];
  vouchers2: TypeVoucher[] = [];
  all: Un[] = []
  cartons: Carton[] = [];
  carnets: Carnet[] = [];
  units: Unite[] = [];
  page: number = 1;
  totalPages: number;
  totalElements: number;
  page1: number = 1;
  totalPages1: number;
  totalElements1: number;
  size1: number = 20;
  size: number = 20;
  roleUser = localStorage.getItem('userAccount').toString()
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router,
              private orderService: OrderService, private notifService: NotifsService, private storeService: StoreService,
              private storeHouseService: StoreHouseService, private unitService: UnitsService, private _location: Location,
              private itemService: ItemService, private voucherService: VoucherService, private cartonService: CartonService,
              private carnetService: CarnetService, private statusService: StatusService) {
    this.store = new Store()
  }

  ngOnInit(): void {
    this.getStoreHouseInfos(),
    this.getVoucherType()
    this.getCartonsByStoreHouse()
    this.getCarnetsByStoreHouse()
    this.getItemsByStoreHouse()
  }

  getVoucherType(){
      this.voucherService.getTypevoucher().subscribe(
        res => {
          this.vouchers = res.content;
          this.vouchers1 = res.content;
          this.vouchers2 = res.content;
          console.log('bons',res)
        }
      )
  }

  getCartonsByStoreHouse(){
    this.activatedRoute.params.subscribe(params => {
      this.cartonService.getCartonsByStoreHouse(params['id'], this.page - 1, this.size1).subscribe(
        res => {
          this.cartons = res.content;
          console.log('cartons', this.cartons)
          this.size = res.size
          this.totalPages = res.totalPages
          this.totalElements = res.totalElements
        }
      )
    })
  }

  getCarnetsByStoreHouse(){
    this.activatedRoute.params.subscribe(params => {
      this.carnetService.getCarnetsByStoreHouse(params['id'], this.page1 - 1, this.size1).subscribe(
        resp => {
          this.carnets = resp.content;
          this.size1 = resp.size
          this.totalPages1 = resp.totalPages
          this.totalElements1 = resp.totalElements
        }
      )
    })
  }

  getStoreHouseInfos(){
    this.activatedRoute.params.subscribe(params => {
      this.storeHouseService.getStoreHouseByInternalRef(params['id']).subscribe(
        res => {
          this.storeHouse = res;
        }
      )
    })
  }

  getItemsByStoreHouse(){
    this.activatedRoute.params.subscribe(params => {
      this.storeHouseService.getItemByStoreHouse(params['id']).subscribe(
        res => {
          this.items = res;
        }
      )
    })
  }

  back() {
    this._location.back()
  }

  pageChangeCarnet(event: number){
    this.page1 = event
    this.carnetService.getCarnetsByStoreHouse(this.storeHouse.internalReference,this.page1 -1, this.size1).subscribe(
      resp => {
        this.carnets = resp.content
        this.size1 = resp.size
        this.totalPages1 = resp.totalPages
        this.totalElements1 = resp.totalElements
      },
    )
  }

  pageChangeCarton(event: number){
    this.page = event
    this.cartonService.getCartonsByStoreHouse(this.storeHouse.internalReference,this.page -1, this.size).subscribe(
      resp => {
        this.cartons = resp.content
        this.size = resp.size
        this.totalPages = resp.totalPages
        this.totalElements = resp.totalElements
      },
    )
  }

  padWithZero(num, targetLength) {
    return String(num).padStart(targetLength, '0');
  }


  getStatuts(status: string): string {
    return this.statusService.allStatus(status)
  }

  removeZeros(coupon: string): string{
    return coupon.replace(/[0]/g,'')
  }

  // findCarton(idCarton: number): number {
  //   let numero: number
  //   this.cartonService.findCarton(idCarton).subscribe(
  //     res => {
  //       console.log('carton',res)
  //       numero = res.number;
  //     }
  //   )
  //   return numero
  // }

  formatNumber(amount: number): string{
    return amount.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g,'$1 ');
  }
}
