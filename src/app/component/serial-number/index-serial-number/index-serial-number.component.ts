import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StoreHouse} from "../../../_model/storehouse";
import {Carton} from "../../../_model/carton";
import {Carnet} from "../../../_model/carnet";
import {TypeVoucher} from "../../../_model/typeVoucher";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "../../../_model/store";
import {BehaviorSubject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {StoreService} from "../../../_services/store/store.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {CartonService} from "../../../_services/cartons/carton.service";
import {CarnetService} from "../../../_services/carnets/carnet.service";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-index-serial-number',
  templateUrl: './index-serial-number.component.html',
  styleUrls: ['./index-serial-number.component.css']
})
export class IndexSerialNumberComponent implements OnInit {

  storeHouses: StoreHouse[] = [];
  storeHouse: StoreHouse = new StoreHouse();
  cartons: Carton[] = [];
  carton: Carton = new Carton();
  carnet: Carnet = new Carnet();
  vouchers: TypeVoucher[] = [];
  @ViewChild('mymodal', { static: false }) viewMe?: ElementRef<HTMLElement>;
  cartonForm: FormGroup ;
  storeHouseType = ['stockage', 'vente']
  stores: Store[] = [];
  store: Store = new Store();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  modalTitle = 'Enregistrer un nouvelle série'
  magasin: string
  typcoupon: any;
  sn: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private storeHouseService: StoreHouseService,
              private storeService: StoreService, private notifService: NotifsService, private cartonService: CartonService,
              private carnetService: CarnetService, private voucherService: VoucherService) {
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
  }

  //formulaire de création
  formCarton(){
    this.cartonForm = this.fb.group({
      idStoreHouse: ['', [Validators.required]],
      idStore: ['', [Validators.required]],
      serialNumber: ['', [Validators.required, Validators.minLength(1)]],
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
  getStoreHouses(event: any){
    console.log('event', event)

    this.storeHouseService.getStoreHouses().subscribe(
      resp => {
        console.log(resp)
        const store = this.stores.find(st => st.localization === event)
        console.log(store)
        this.storeHouses = resp.content.filter(sth => sth.idStore == store.internalReference && sth.type == 'stockage')
        console.log('filtrées',this.storeHouses)
        console.log('filtrées2',resp.content.filter(sth => sth.idStore == store.internalReference ))
        this.notifService.onSuccess('chargement des entrepots')
      },
    )
  }

  //save carton
  saveCarton(){
    this.isLoading.next(true);
    this.store = this.stores.find(store => store.localization === this.cartonForm.controls['idStore'].value)
    this.storeHouse = this.storeHouses.find(sth => sth.name == this.cartonForm.controls['idStoreHouse'].value)

    this.carton.idStoreKeeper = parseInt(localStorage.getItem('uid').toString())
    this.carton.idStoreHouseStockage = this.storeHouse.internalReference
    // this.carton.serialNumber = this.cartonForm.controls['serialNumber'].value
    this.cartonService.createCarton(this.carton).subscribe(
      resp => {
        this.cartons.push(resp)
        this.carnet.idCarton = resp.internalReference
        this.carnet.idStoreKeeper = parseInt(localStorage.getItem('uid').toString())
        const tcoupon = this.cartonForm.controls['voucherType'].value
        for (let i = 0; i < 10; i++){
          if (tcoupon === 10000){
            console.log("1 - ")
          }

          // this.carnet.serialNumber =
          //   this.carnetService.createCarnet(this.carnet).subscribe(
          //     response => {
          //
          //     }
          //   )
        }
        this.isLoading.next(false);
        this.notifService.onSuccess('enregistrement effectué')
        this.annuler()
      },
      error => {
        this.isLoading.next(false);
        // this.notifService.onError(error.error.message, 'Erreur lors de la création')
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

  deleteCarton(storeHouse: StoreHouse, index: number) {
    Swal.fire({
      title: 'Supprimer entrepot',
      html: "Voulez-vous vraiment supprimer "+ storeHouse.internalReference.toString().bold() + " de la liste de vos entrepots ?",
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
        this.storeHouseService.deleteStoreHouse(storeHouse.internalReference).subscribe(
          resp => {
            this.storeHouses.splice(index, 1)
            this.isLoading.next(false)
            this.notifService.onSuccess(`entrepot ${storeHouse.internalReference.toString().bold()} supprimé avec succès !`)
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

  updateStoreHouseModal(mymodal: TemplateRef<any>, storeHouse: StoreHouse) {
    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    this.storeHouse = storeHouse
    console.log('magasin', this.stores.find(store => store.internalReference === storeHouse.idStore))
    this.magasin = this.stores.find(store => store.internalReference === storeHouse.idStore).localization
    this.modalTitle = 'Modifier entrepot'
  }

  updateCarton() {
    this.isLoading.next(true);
    this.store = this.stores.find(store => store.localization === this.cartonForm.controls['store'].value)
    console.log(this.store)
    const updateStoreHouse = {
      "idStore" : 0,
      "type" : ''
    }
    updateStoreHouse.type = this.cartonForm.controls['type'].value
    updateStoreHouse.idStore = this.store.internalReference

    this.storeHouseService.updateStoreHouse(updateStoreHouse, this.storeHouse.internalReference).subscribe(
      resp => {
        this.isLoading.next(false);
        // on recherche l'index du client dont on veut faire la modification dans liste des clients
        const index = this.storeHouses.findIndex(storeHouse => storeHouse.internalReference === resp.internalReference);
        this.storeHouses[ index ] = resp;
        this.notifService.onSuccess("entrepot modifié avec succès!")
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
