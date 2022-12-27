import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StoreHouse} from "../../../_model/storehouse";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "../../../_model/store";
import {BehaviorSubject, Observable, of} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {StoreService} from "../../../_services/store/store.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import Swal from "sweetalert2";
import {CartonService} from "../../../_services/cartons/carton.service";
import {Carton} from "../../../_model/carton";
import {CarnetService} from "../../../_services/carnets/carnet.service";
import {Carnet} from "../../../_model/carnet";
import {TypeVoucher} from "../../../_model/typeVoucher";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {Coupon} from "../../../_model/coupon";
import {CouponService} from "../../../_services/coupons/coupon.service";
import {Stock} from "../../../_model/stock";
import {MvtStockService} from "../../../_services/stock/mvt-stock.service";
import {StatusService} from "../../../_services/status/status.service";
import {catchError, map, startWith} from "rxjs/operators";
import {AppState} from "../../../_interfaces/app-state";
import {CustomResponse} from "../../../_interfaces/custom-response";
import {Client} from "../../../_model/client";
import {DataState} from "../../../_enum/data.state.enum";

@Component({
  selector: 'app-stock-carton',
  templateUrl: './stock-carton.component.html',
  styleUrls: ['./stock-carton.component.scss']
})
export class StockCartonComponent implements OnInit {

  storeHouses: StoreHouse[] = [];
  storeHouse: StoreHouse = new StoreHouse();
  cartons: Carton[] = [];
  carton: Carton = new Carton();
  carnet: Carnet = new Carnet();
  coupon: Coupon = new Coupon();
  mvtStock: Stock = new Stock();
  vouchers: TypeVoucher[] = [];
  @ViewChild('mymodal', { static: false }) viewMe?: ElementRef<HTMLElement>;
  cartonForm: FormGroup ;
  storeHouseType = ['stockage', 'vente']
  stores: Store[] = [];
  store: Store = new Store();
  private isLoadingDataStore = new BehaviorSubject<boolean>(false);
  isLoadingDataStore$ = this.isLoadingDataStore.asObservable();
  private isLoadingDataVoucher = new BehaviorSubject<boolean>(false);
  isLoadingDataVoucher$ = this.isLoadingDataVoucher.asObservable();
  private isLoadingDataStoreHouse = new BehaviorSubject<boolean>(false);
  isLoadingDataStoreHouse$ = this.isLoadingDataStoreHouse.asObservable();
  private isLoadingDataCarton = new BehaviorSubject<boolean>(false);
  isLoadingDataCarton$ = this.isLoadingDataCarton.asObservable();
  appState$: Observable<AppState<CustomResponse<Carton>>>;
  readonly DataState = DataState;
  private dataSubjects = new BehaviorSubject<CustomResponse<Carton>>(null);
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  modalTitle = 'Enregistrer un nouveau carton'
  magasin: string
  entrepot: string;
  sctd: number;
  sctf: number;
  scpd: number;
  scpf: number;
  nc: number;
  page: number = 1;
  totalPages: number;
  totalElements: number;
  size: number = 20;
  roleUser = localStorage.getItem('userAccount').toString()

  constructor(private fb: FormBuilder, private modalService: NgbModal, private storeHouseService: StoreHouseService,
              private storeService: StoreService, private notifService: NotifsService, private cartonService: CartonService,
              private carnetService: CarnetService, private voucherService: VoucherService, private couponService: CouponService,
              private mvtStockService: MvtStockService, private statusService: StatusService) {
    this.formCarton();
  }

  ngOnInit(): void {
    this.getStores();
    this.getTypeVoucher();
    // this.getStoreHousess();
    this.getCartons();
  }

  //formulaire de création
  formCarton(){
    this.cartonForm = this.fb.group({
      idStoreHouse: ['', [Validators.required]],
      idStore: ['', [Validators.required]],
      typeVoucher: ['', [Validators.required]],
      serialFrom: ['', [Validators.required, Validators.pattern('^[0-9 ]*$'), Validators.min(1)]],
      serialTo: ['', [Validators.required, Validators.pattern('^[0-9 ]*$'), Validators.min(1)]],
      number: ['', [Validators.required, Validators.pattern('^[0-9 ]*$'), Validators.min(1)]],
      from: ['', [Validators.required, Validators.pattern('^[0-9 ]*$'), Validators.min(1)]],
      to: ['', [Validators.required, Validators.pattern('^[0-9 ]*$'), Validators.min(1)]],
    });
  }

  //récupération de la liste des magasins
    getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.stores = resp.content
      },
    )
  }

  //récupération de la liste des entrepots
  getCartons(){
    this.appState$ = this.cartonService.cartons$(this.page - 1, this.size)
      .pipe(
        map(response => {
          console.log(response)
          this.dataSubjects.next(response)
          this.notifService.onSuccess('chargement des cartons')
          return {dataState: DataState.LOADED_STATE, appData: response}
        }),
        startWith({dataState: DataState.LOADING_STATE, appData: null}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR_STATE, error: error})
        })
      )
  }
  //récupération de la liste des entrepots
  getStoreHouses(event: any){
    const store = this.stores.find(st => st.localization === event)
    if(event != ''){
      this.storeHouses = []
      this.isLoading.next(true);
      this.storeHouseService.getStoreHousesByStore(store.internalReference).subscribe(
        resp => {
          this.isLoading.next(false);
            this.storeHouses = resp.content.filter(sth => sth.type == 'stockage')
          // this.notifService.onSuccess('chargement des entrepots')
        },
      )
    }

  }

  padWithZero(num, targetLength) {
    return String(num).padStart(targetLength, '0');
  }

  //save carton
  saveCarton(){
    this.isLoading.next(true);
    console.log(this.cartonForm.controls['typeVoucher'].value)
    this.store = this.stores.find(store => store.localization === this.cartonForm.controls['idStore'].value)
    let typ = this.vouchers.find(tv => tv.amount == parseInt(this.cartonForm.controls['typeVoucher'].value))
    this.storeHouse = this.storeHouses.find(sth => sth.name == this.cartonForm.controls['idStoreHouse'].value)

    this.carton.idStoreKeeper = parseInt(localStorage.getItem('uid').toString())
    this.carton.idStoreHouseStockage = this.storeHouse.internalReference
    // this.carton.idStoreHouseSell = this.storeHouse.internalReference
    this.carton.number = parseInt(this.cartonForm.controls['number'].value)
    this.carton.from = parseInt(this.cartonForm.controls['from'].value)
    this.carton.to = parseInt(this.cartonForm.controls['to'].value)
    this.carton.serialFrom = parseInt(this.cartonForm.controls['serialFrom'].value)
    this.carton.serialTo = parseInt(this.cartonForm.controls['serialTo'].value)
    this.carton.typeVoucher = typ.amount
    // setTimeout(() =>{
    //   const notif = 'Vous recevrez une notification une fois l\'opération terminé'
    //   Swal.fire({
    //     title: 'Opération en cours',
    //     html: 'Le système est entrain de créer le carton et générer les coupons. '+ notif.toString().bold() ,
    //     icon: 'info',
    //     footer: '<a ></a>',
    //     showCancelButton: false,
    //     confirmButtonText: 'OK',
    //     allowOutsideClick: false,
    //     focusConfirm: false,
    //     backdrop: `rgba(0, 0, 0, 0.4)`
    //   }).then((result) => {
    //     if (result.value) {
    //       this.annuler()
    //     }
    //   })
    // }  , 1000);
    this.cartonService.createCarton(this.carton).subscribe(
      resp => {
        this.isLoading.next(false);
        this.notifService.onSuccess('Carton crée avec succès!')
        this.getCartons();
        this.annuler()
      },
      error => {
        this.isLoading.next(false);
      }
    )
  }

  //on récupère la liste des types de coupon
  getTypeVoucher(): void{
    this.voucherService.getTypevoucher().subscribe(
      resp => {
        this.vouchers = resp.content
      }
    )
  }

  annuler() {
    this.formCarton();
    this.cartonForm.reset()
    this.nc = null
    this.sctf = null
    this.sctd = null
    this.scpf = null
    this.scpd = null
    this.storeHouse = new StoreHouse()
    this.modalService.dismissAll()
    this.magasin = ''
  }
  //open modal



  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  updateCartonModal(mymodal: TemplateRef<any>, carton: Carton) {
    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    this.carton = carton
    // this.sn = carton.serialNumber
    console.log('magasin', this.stores.find(store => store.internalReference === carton.idStoreHouseStockage))
    this.storeHouse = this.storeHouses.find(store => store.internalReference === carton.idStoreHouseStockage)
    this.entrepot = this.storeHouse.name
    this.magasin = this.stores.find(store => store.internalReference === this.storeHouse.idStore).localization
    this.modalTitle = 'Modifier carton'
  }

  updateCarton() {
    this.isLoading.next(true);
    this.store = this.stores.find(store => store.localization === this.cartonForm.controls['idStore'].value)
    this.storeHouse = this.storeHouses.find(sth => sth.idStore == this.store.internalReference && sth.type === 'stockage')

    // this.carton.idStoreKeeper = parseInt(localStorage.getItem('uid').toString())
    // this.carton.idStoreHouse = this.storeHouse.internalReference
    // this.carton.serialNumber = this.cartonForm.controls['serialNumber'].value
    const updateCarton = {
      "idStoreKeeper" : 0,
      "serialNumber" : '',
      "idStoreHouse" : 0
    }
    updateCarton.idStoreKeeper = parseInt(localStorage.getItem('uid').toString())
    updateCarton.idStoreHouse = this.cartonForm.controls['idStoreHouse'].value
    updateCarton.serialNumber = this.cartonForm.controls['serialNumber'].value

    this.cartonService.updateCarton(updateCarton, this.carton.internalReference).subscribe(
      resp => {
        this.isLoading.next(false);
        // on recherche l'index du client dont on veut faire la modification dans liste des clients
        const index = this.cartons.findIndex(carton => carton.internalReference === resp.internalReference);
        this.cartons[ index ] = resp;
        this.notifService.onSuccess("carton modifié avec succès!")
        this.annuler()
      },
      error => {
        this.isLoading.next(false);
        // if (error.error.message.includes('JWT expired')){
        //
        // }else {
        //   this.notifService.onError(error.error.message, '')
        // }
      }
    )
  }

  getStatuts(status: string): string {
    return this.statusService.allStatus(status)
  }

  pageChange(event: number){
    this.page = event
    this.appState$ = this.cartonService.cartons$(this.page - 1, this.size)
      .pipe(
        map(response => {
          this.dataSubjects.next(response)
          return {dataState: DataState.LOADED_STATE, appData: response}
        }),
        startWith({dataState: DataState.LOADING_STATE, appData: null}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR_STATE, error: error})
        })
      )
  }

  removeZeros(coupon: string): string{
    return coupon.replace(/[0]/g,'')
  }
}
