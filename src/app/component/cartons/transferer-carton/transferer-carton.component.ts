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
  storeHouses1: StoreHouse[] = [];
  storeHouses2: StoreHouse[] = [];
  constructor(private userService: UsersService,  private notifsService: NotifsService, private route: ActivatedRoute,
              private storeService: StoreService, private storeHouseService: StoreHouseService, private fb: FormBuilder,
              private voucherService: VoucherService, private cartonService: CartonService) {
    this.supplyForm = this.fb.group({
      idStoreHouseStockage: ['', [Validators.required]],
      idStoreHouseSell: ['', [Validators.required]],
      typeVoucher: ['', [Validators.required]],
      serialFrom: ['', [Validators.required]],
      serialTo: ['', [Validators.required]],
      number: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
    });

    this.form = this.supplyForm.controls;
  }
  ngOnInit() {
    this.getTypeVoucher()
    this.getStoreHouses()
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
        this.storeHouses2 = resp.content.filter(st => st.type == 'vente')
        console.log("entrepots", resp.content)
        console.log("entrepots1", this.storeHouses1)
        console.log("entrepots2", this.storeHouses2)
      },
    )
  }
  //save carton
  supplyCarton(){
    this.isLoading.next(true);
    console.log(this.supplyForm.controls['typeVoucher'].value)
    // this.store = this.stores.find(store => store.localization === this.supplyForm.controls['idStore'].value)
    let typ = this.vouchers.find(tv => tv.amount == parseInt(this.supplyForm.controls['typeVoucher'].value))
    this.storeHouse1 = this.storeHouses1.find(sth => sth.name == this.supplyForm.controls['idStoreHouseStockage'].value)
    this.storeHouse2 = this.storeHouses2.find(sth => sth.name == this.supplyForm.controls['idStoreHouseSell'].value)

    this.supply.idStoreKeeper = parseInt(localStorage.getItem('uid').toString())
    this.supply.idStoreHouseStockage = this.supplyForm.controls['idStoreHouseStockage'].value
    this.supply.idStoreHouseSell = this.supplyForm.controls['idStoreHouseSell'].value
    this.supply.number = parseInt(this.form['number'].value)
    this.supply.from = parseInt(this.form['from'].value)
    this.supply.to = parseInt(this.form['to'].value)
    this.supply.serialFrom = parseInt(this.form['serialFrom'].value)
    this.supply.serialTo = parseInt(this.form['serialTo'].value)
    this.supply.typeVoucher = typ.amount

    console.log('supply', this.supply)

    this.cartonService.createCartonSupply(this.supply).subscribe(
      resp => {
        console.log('carton approvisionné', resp)
        // this.cartons.push(resp)
        // this.mvtStockService.createStockMovement(this.mvtStock).subscribe()
        this.isLoading.next(false);
        this.notifsService.onSuccess('approvisionnement effectué')
        // this.annuler()
      },
      error => {
        this.isLoading.next(false);
      }
    )
  }



}
