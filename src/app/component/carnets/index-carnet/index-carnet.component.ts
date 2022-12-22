import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StoreHouse} from "../../../_interfaces/storehouse";
import {Carton} from "../../../_interfaces/carton";
import {Carnet} from "../../../_interfaces/carnet";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "../../../_interfaces/store";
import {BehaviorSubject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {StoreService} from "../../../_services/store/store.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {CartonService} from "../../../_services/cartons/carton.service";
import {CarnetService} from "../../../_services/carnets/carnet.service";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import Swal from "sweetalert2";
import {StatusService} from "../../../_services/status/status.service";

@Component({
  selector: 'app-index-carnet',
  templateUrl: './index-carnet.component.html',
  styleUrls: ['./index-carnet.component.css']
})
export class IndexCarnetComponent implements OnInit {

  storeHouses: StoreHouse[] = [];
  storeHouse: StoreHouse = new StoreHouse();
  cartons: Carton[] = [];
  carton: Carton = new Carton();
  carnet: Carnet = new Carnet();
  carnets: Carnet[];
  vouchers: TypeVoucher[] = [];
  cartonForm: FormGroup ;
  stores: Store[] = [];
  store: Store = new Store();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  magasin: string
  entrepot: string;
  typcoupon: any;
  sn: any;
  page: number = 1;
  totalPages: number;
  totalElements: number;
  size: number = 20;
  roleUser = localStorage.getItem('userAccount').toString()
  constructor(private fb: FormBuilder, private modalService: NgbModal, private storeHouseService: StoreHouseService,
              private storeService: StoreService, private notifService: NotifsService, private cartonService: CartonService,
              private carnetService: CarnetService, private voucherService: VoucherService, private statusService: StatusService) {
    this.formCarton();
  }

  ngOnInit(): void {
    this.getStores();
    this.getTypeVoucher()
    this.storeHouseService.getStoreHouses().subscribe(
      resp => {
        this.storeHouses = resp.content
      },
    )
    this.getCartons();
    this.getCarnets();
  }

  //formulaire de création
  formCarton(){
    this.cartonForm = this.fb.group({
      idStoreHouse: ['', [Validators.required]],
      idStore: ['', [Validators.required]],
      serialNumber: ['', [Validators.required, ]],
      voucherType: ['', [Validators.required]],
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
        this.cartons = resp.content
        this.notifService.onSuccess('chargement des cartons')
      },
    )
  }
  //récupération de la liste des entrepots
  getCarnets(){

    this.carnetService.getCarnets(this.page -1, this.size).subscribe(
      resp => {
        console.log(resp)
        this.carnets = resp.content
        this.size = resp.size
        this.totalPages = resp.totalPages
        this.totalElements = resp.totalElements
        this.notifService.onSuccess('chargement des carnets')
      },
    )
  }
  //récupération de la liste des entrepots
  getStoreHouses(event: any){
    console.log('event', event)

    this.storeHouseService.getStoreHouses().subscribe(
      resp => {
        console.log(resp)
        const store = this.stores.find(st => st.localization === event)
        console.log(store)
        if (event != ''){
          this.storeHouses = resp.content.filter(sth => sth.idStore == store.internalReference && sth.type == 'stockage')
          console.log('filtrées2',resp.content.filter(sth => sth.idStore == store.internalReference ))
        }

        console.log('filtrées',this.storeHouses)

        this.notifService.onSuccess('chargement des entrepots')
      },
    )
  }

  padWithZero(num, targetLength) {
    return String(num).padStart(targetLength, '0');
  }

  compare( a: Carnet, b: Carnet ) {
    if ( a.serialNumber < b.serialNumber ){
      return -1;
    }
    if ( a.serialNumber > b.serialNumber ){
      return 1;
    }
    return 0;
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

  }
  //open modal



  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  deleteCarnet(carnet: Carnet, index: number) {
    Swal.fire({
      title: 'Supprimer carton',
      html: "Voulez-vous vraiment supprimer "+ carnet.serialNumber.toString().bold() + " de la liste de vos carnets ?",
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
        this.carnetService.deleteCarnet(carnet.internalReference).subscribe(
          resp => {
            this.carnets.splice(index, 1)
            this.isLoading.next(false)
            this.notifService.onSuccess(`carnet ${carnet.internalReference.toString().bold()} supprimé avec succès !`)
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

  pageChange(event: number){
    this.page = event
    this.carnetService.getCarnets(this.page -1, this.size).subscribe(
      resp => {
        this.carnets = resp.content
        this.size = resp.size
        this.totalPages = resp.totalPages
        this.totalElements = resp.totalElements
      },
    )
  }

  getStatuts(status: string): string {
    return this.statusService.allStatus(status)
  }
}
