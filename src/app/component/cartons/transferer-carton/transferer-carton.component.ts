import { Component, OnInit } from '@angular/core';
import {ICredentialsSignup, ISignup} from "../../../_interfaces/signup";
import {Store} from "../../../_interfaces/store";
import {StoreHouse} from "../../../_interfaces/storehouse";
import {Supply} from "../../../_interfaces/supply";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {BehaviorSubject} from "rxjs";
import {UsersService} from "../../../_services/users/users.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {ActivatedRoute} from "@angular/router";
import {StoreService} from "../../../_services/store/store.service";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {CartonService} from "../../../_services/cartons/carton.service";
import {MvtStockService} from "../../../_services/stock/mvt-stock.service";
import {Stock} from "../../../_interfaces/stock";

@Component({
  selector: 'app-transferer-carton',
  templateUrl: './transferer-carton.component.html',
  styleUrls: ['./transferer-carton.component.css']
})
export class TransfererCartonComponent implements OnInit {

  user: ISignup = new ISignup();
  store: Store = new Store();
  storeHouseStockage: StoreHouse = new StoreHouse();
  storeHouseSell: StoreHouse = new StoreHouse();
  supply: Supply = new Supply();
  stock: Stock = new Stock();

  supplyForm: FormGroup ;
  credentials: ICredentialsSignup = new ICredentialsSignup()

  errorMessage = '';
  stores: Store[] = [];
  vouchers: TypeVoucher[] = [];
  form: any;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  magasin: string
  entrepot: string;
  typcoupon: any;
  sn: any;
  storeHouse1: StoreHouse = new StoreHouse();
  storeHouse2: StoreHouse = new StoreHouse();
  stores1: Store[] = [];
  stores2: Store[] = [];
  storeHouses1: StoreHouse[] = [];
  storeHouses2: StoreHouse[] = [];
  constructor(private userService: UsersService,  private notifsService: NotifsService, private route: ActivatedRoute,
              private storeService: StoreService, private storeHouseService: StoreHouseService, private fb: FormBuilder,
              private voucherService: VoucherService, private cartonService: CartonService, private mvtService: MvtStockService) {
    this.supplyForm = this.fb.group({
      idStore1: ['', [Validators.required]],
      idStore2: ['', [Validators.required]],
      idStoreHouseStockage1: ['', [Validators.required]],
      idStoreHouseStockage2: ['', [Validators.required]],
      typeVoucher: ['', [Validators.required]],
      qte: ['', [Validators.required]],
    });

    this.form = this.supplyForm.controls;
  }
  ngOnInit() {
    this.getTypeVoucher()
    this.getStoreHouses()
    this.getStores()
  }

  //on récupère la liste des types de coupon
  getTypeVoucher(): void{
    this.voucherService.getTypevoucher().subscribe(
      resp => {
        this.vouchers = resp.content
      }
    )
  }

  getStoreHouses(){
    this.storeHouseService.getStoreHouses().subscribe(
      resp => {
        this.storeHouses1 = resp.content.filter(st => st.type == 'stockage')
        console.log("entrepots", resp.content)
        console.log("entrepots1", this.storeHouses1)
        console.log("entrepots2", this.storeHouses2)
      },
    )
  }

  getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.stores1 = resp.content
      },
    )
  }
  //save carton
  transfertCarton(){
    this.isLoading.next(true);
    console.log(this.supplyForm.controls['typeVoucher'].value)
    // this.store = this.stores.find(store => store.localization === this.supplyForm.controls['idStore'].value)
    let typ = this.vouchers.find(tv => tv.amount == parseInt(this.supplyForm.controls['typeVoucher'].value))

    this.stock.idStoreKeeper = parseInt(localStorage.getItem('uid').toString())
    this.stock.idStore1 = this.supplyForm.controls['idStore1'].value
    this.stock.idStore2 = this.supplyForm.controls['idStore2'].value
    this.stock.idStoreHouseStockage1 = this.supplyForm.controls['idStoreHouseStockage1'].value
    this.stock.idStoreHouseStockage2 = this.supplyForm.controls['idStoreHouseStockage2'].value
    this.stock.type = 'transfert'
    this.stock.quantityCarton = this.supplyForm.controls['qte'].value
    this.stock.typeVoucher = typ.amount

    console.log('supply', this.stock)

    this.mvtService.createStockMovement(this.stock).subscribe(
      resp => {
        console.log('carton approvisionné', resp)
        // this.cartons.push(resp)
        // this.mvtStockService.createStockMovement(this.mvtStock).subscribe()
        this.isLoading.next(false);
        this.notifsService.onSuccess('transfert effectué')
        // this.annuler()
      },
      error => {
        this.isLoading.next(false);
      }
    )
  }



}
