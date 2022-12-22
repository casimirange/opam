import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../_services/users/users.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {ActivatedRoute} from "@angular/router";
import {StoreService} from "../../../_services/store/store.service";
import {ICredentialsSignup, ISignup} from "../../../_interfaces/signup";
import {Store} from "../../../_interfaces/store";
import {BehaviorSubject} from "rxjs";
import {Supply} from "../../../_interfaces/supply";
import {StoreHouse} from "../../../_interfaces/storehouse";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {CartonService} from "../../../_services/cartons/carton.service";
import {Carton} from "../../../_interfaces/carton";

@Component({
  selector: 'app-approvisionner-carnet',
  templateUrl: './approvisionner-carnet.component.html',
  styleUrls: ['./approvisionner-carnet.component.css']
})
export class ApprovisionnerCarnetComponent implements OnInit {

  user: ISignup = new ISignup();
  store: Store = new Store();
  storeHouseStockage: StoreHouse = new StoreHouse();
  storeHouseSell: StoreHouse = new StoreHouse();
  supply: Supply = new Supply();

  supplyForm: FormGroup ;
  credentials: ICredentialsSignup = new ICredentialsSignup()

  errorMessage = '';
  stores: Store[] = [];
  cartons: Carton[] = [];
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
  roleUser = localStorage.getItem('userAccount').toString()
  constructor(private userService: UsersService,  private notifsService: NotifsService, private route: ActivatedRoute,
              private storeService: StoreService, private storeHouseService: StoreHouseService, private fb: FormBuilder,
              private voucherService: VoucherService, private cartonService: CartonService) {
    // this.supplyForm = this.fb.group({
    //   idStoreHouseStockage: ['', [Validators.required]],
    //   idStoreHouseSell: ['', [Validators.required]],
    //   typeVoucher: ['', [Validators.required]],
    //   serialFrom: ['', [Validators.required]],
    //   serialTo: ['', [Validators.required]],
    //   number: ['', [Validators.required]],
    //   from: ['', [Validators.required]],
    //   to: ['', [Validators.required]],
    // });
    this.supplyForm = this.fb.group({
      idCarton: ['', [Validators.required]],
      idStoreHouseSell: ['', [Validators.required]],
    });

    this.form = this.supplyForm.controls;
  }
  ngOnInit() {
    this.getTypeVoucher()
    this.getStoreHouses()
    this.getCartons()
  }

  //on récupère la liste des types de coupon
  getTypeVoucher(): void{
    this.voucherService.getTypevoucher().subscribe(
      resp => {
        this.vouchers = resp.content
      }
    )
  }

  //on récupère la liste des types de coupon
  getCartons(): void{
    this.cartonService.getCartons().subscribe(
      resp => {
        this.cartons = resp.content
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
    this.supply.idCarton = this.supplyForm.controls['idCarton'].value
    this.supply.idStoreHouseSell = this.supplyForm.controls['idStoreHouseSell'].value


    console.log('supply', this.supply)

    this.cartonService.createCartonSupply(this.supply.idCarton, this.supply.idStoreHouseSell).subscribe(
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
