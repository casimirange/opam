import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StoreHouse} from "../../../_interfaces/storehouse";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "../../../_interfaces/store";
import {BehaviorSubject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {StoreService} from "../../../_services/store/store.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import Swal from "sweetalert2";
import {CartonService} from "../../../_services/cartons/carton.service";
import {Carton} from "../../../_interfaces/carton";
import {CarnetService} from "../../../_services/carnets/carnet.service";
import {Carnet} from "../../../_interfaces/carnet";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {Coupon} from "../../../_interfaces/coupon";
import {CouponService} from "../../../_services/coupons/coupon.service";
import {Stock} from "../../../_interfaces/stock";
import {MvtStockService} from "../../../_services/stock/mvt-stock.service";

@Component({
  selector: 'app-stock-carton',
  templateUrl: './stock-carton.component.html',
  styleUrls: ['./stock-carton.component.css']
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
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  modalTitle = 'Enregistrer un nouveau carton'
  magasin: string
  entrepot: string;
  typcoupon: any;
  sn: any;
  page: number = 1;
  totalPages: number;
  totalElements: number;
  size: number = 20;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private storeHouseService: StoreHouseService,
              private storeService: StoreService, private notifService: NotifsService, private cartonService: CartonService,
              private carnetService: CarnetService, private voucherService: VoucherService, private couponService: CouponService,
              private mvtStockService: MvtStockService) {
    this.formCarton();
  }

  ngOnInit(): void {
    this.getStores();
    this.getTypeVoucher();
    this.getStoreHousess();
    this.getCartons();
  }

  getStoreHousess(){
    this.storeHouseService.getStoreHouses().subscribe(
      resp => {
        this.storeHouses = resp.content
      },
    )
  }

  //formulaire de création
  formCarton(){
    this.cartonForm = this.fb.group({
      idStoreHouse: ['', [Validators.required]],
      idStore: ['', [Validators.required]],
      typeVoucher: ['', [Validators.required]],
      serialFrom: ['', [Validators.required]],
      serialTo: ['', [Validators.required]],
      number: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
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

    this.cartonService.getCartons().subscribe(
      resp => {
        console.log('liste des cartons', resp)
        this.cartons = resp.content
        this.size = resp.size
        this.totalPages = resp.totalPages
        this.totalElements = resp.totalElements
        console.log(resp.content)
        this.notifService.onSuccess('chargement des cartons')
      },
    )
  }
  //récupération de la liste des entrepots
  getStoreHouses(event: any){
    console.log('event', event)

    this.storeHouseService.getStoreHouses().subscribe(
      resp => {
        console.log('tous les entrpots',resp)
        const store = this.stores.find(st => st.localization === event)
        console.log('le mag', store)
        // this.storeHouseService.getStoreHouses().subscribe(
        //   resp => {
        //     this.storeHouses = resp.content
        //   },
        // )
        if (event != ''){
          this.storeHouses = resp.content.filter(sth => sth.type == 'stockage')
          console.log('filtrées2',resp.content.filter(sth => sth.store.localization == store.internalReference ))
        }

        console.log('filtrées',this.storeHouses)

        this.notifService.onSuccess('chargement des entrepots')
      },
    )
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
    this.carton.idStoreHouseSell = this.storeHouse.internalReference
    this.carton.number = parseInt(this.cartonForm.controls['number'].value)
    this.carton.from = parseInt(this.cartonForm.controls['from'].value)
    this.carton.to = parseInt(this.cartonForm.controls['to'].value)
    this.carton.serialFrom = parseInt(this.cartonForm.controls['serialFrom'].value)
    this.carton.serialTo = parseInt(this.cartonForm.controls['serialTo'].value)
    this.carton.typeVoucher = typ.amount

    this.cartonService.createCarton(this.carton).subscribe(
      resp => {
        console.log('carton créé', resp)
        /**
         * je dois résoudre le fait de charger toute la liste des cartons car un soucis avec la réponse qui est retournée
         */
        // this.cartons.push(resp)
        this.getCartons();
        // this.mvtStockService.createStockMovement(this.mvtStock).subscribe()
        this.isLoading.next(false);
        this.notifService.onSuccess('enregistrement effectué')
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
    this.storeHouse = new StoreHouse()
    this.modalService.dismissAll()
    this.magasin = ''
  }
  //open modal



  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  deleteCarton(carton: Carton, index: number) {
    Swal.fire({
      title: 'Supprimer carton',
      html: "Voulez-vous vraiment supprimer "+ carton.number.toString().bold() + " de la liste de vos cartons ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00ace6',
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON',
      allowOutsideClick: true,
      focusConfirm: false,
      focusCancel: true,
      focusDeny: true,
      backdrop: `rgba(0, 0, 0, 0.4)`,
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.isLoading.next(true)
        this.cartonService.deleteCarton(carton.internalReference).subscribe(
          resp => {
            this.cartons.splice(index, 1)
            this.isLoading.next(false)
            this.notifService.onSuccess(`carton ${carton.internalReference.toString().bold()} supprimé avec succès !`)
          },error => {
            this.isLoading.next(false);
            // if (error.error.message.includes('JWT expired')){
            //
            // }else {
            //   this.notifService.onError(error.error.message, '')
            // }
          }
        )
      }
    })
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

}
