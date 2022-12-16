import { Component, OnInit } from '@angular/core';
import {Store} from "../../../_interfaces/store";
import {Order} from "../../../_interfaces/order";
import {StoreHouse} from "../../../_interfaces/storehouse";
import {Unite} from "../../../_interfaces/unite";
import {ClientService} from "../../../_services/clients/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../_services/order/order.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {StoreService} from "../../../_services/store/store.service";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {UnitsService} from "../../../_services/units/units.service";
import {Location} from "@angular/common";
import {ItemService} from "../../../_services/items/item.service";
import {Piece} from "../../../_interfaces/piece";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {CartonService} from "../../../_services/cartons/carton.service";
import {CarnetService} from "../../../_services/carnets/carnet.service";
import {Carton} from "../../../_interfaces/carton";
import {Carnet} from "../../../_interfaces/carnet";

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
  cartons: Carton[] = [];
  carnets: Carnet[] = [];
  units: Unite[] = [];
  page: number = 1;
  totalPages: number;
  totalElements: number;
  size: number = 20;
  roleUser = localStorage.getItem('userAccount').toString()
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router,
              private orderService: OrderService, private notifService: NotifsService, private storeService: StoreService,
              private storeHouseService: StoreHouseService, private unitService: UnitsService, private _location: Location,
              private itemService: ItemService, private voucherService: VoucherService, private cartonService: CartonService,
              private carnetService: CarnetService) {
    this.store = new Store()
  }

  ngOnInit(): void {
    // this.getStoreInfos()
    this.getStoreHouseInfos(),
    // this.getStores()
    this.getVoucherType()

      this.getCartonsByStoreHouse()

      this.getCarnetsByStoreHouse()

    this.getItemsByStoreHouse()
    this.getUnitByStore()
  }

  getVoucherType(){
      this.voucherService.getTypevoucher().subscribe(
        res => {
          this.vouchers = res.content;
          console.log('bons',res)
        }
      )
  }

  getCartonsByStoreHouse(){
    this.activatedRoute.params.subscribe(params => {
      this.cartonService.getCartonsByStoreHouse(params['id'], this.page - 1).subscribe(
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
      this.carnetService.getCarnetsByStoreHouse(params['id'], this.page - 1).subscribe(
        resp => {
          this.carnets = resp.content;
          this.size = resp.size
          this.totalPages = resp.totalPages
          this.totalElements = resp.totalElements
        }
      )
    })
  }

  getStoreHouseInfos(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.storeHouseService.getStoreHouseByInternalRef(params['id']).subscribe(
        res => {
          this.storeHouse = res;
          console.log('storeHouse',res)
        }
      )
    })
  }

  getItemsByStoreHouse(){
    console.log(this.router.url)
    this.activatedRoute.params.subscribe(params => {
      this.itemService.getItemByStoreHouse(params['id']).subscribe(
        res => {
          console.log(res)
          this.items = res.content;
          console.log('pieces', this.items)
          this.notifService.onSuccess('chargement des pièces de l\'entrepôt')
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

  pageChangeCarnet(event: number){
    this.page = event
    this.carnetService.getCarnetsByStoreHouse(this.storeHouse.internalReference,this.page -1).subscribe(
      resp => {
        this.carnets = resp.content
        this.size = resp.size
        this.totalPages = resp.totalPages
        this.totalElements = resp.totalElements
      },
    )
  }

  pageChangeCarton(event: number){
    this.page = event
    this.cartonService.getCartonsByStoreHouse(this.storeHouse.internalReference,this.page -1).subscribe(
      resp => {
        this.cartons = resp.content
        this.size = resp.size
        this.totalPages = resp.totalPages
        this.totalElements = resp.totalElements
      },
    )
  }

}
