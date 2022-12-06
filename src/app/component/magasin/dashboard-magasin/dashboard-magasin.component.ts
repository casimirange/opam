import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status, TypeVoucher} from "../../../_interfaces/typeVoucher";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {Store} from "../../../_interfaces/store";
import {StoreService} from "../../../_services/store/store.service";
import {BehaviorSubject} from "rxjs";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {PaiementMethod} from "../../../_interfaces/paiement";
import Swal from "sweetalert2";
import {UnitsService} from "../../../_services/units/units.service";
import {Unite} from "../../../_interfaces/unite";
import {StoreHouse} from "../../../_interfaces/storehouse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-magasin',
  templateUrl: './dashboard-magasin.component.html',
  styleUrls: ['./dashboard-magasin.component.css']
})
export class DashboardMagasinComponent implements OnInit {

  storeForm: FormGroup;
  stores: Store[] = [];
  store: Store = new Store ();
  unit: Unite = new Unite();
  typeVouchers: TypeVoucher[]
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  modalTitle: string = 'Enregistrer nouveau magasin';
  constructor(private modalService: NgbModal, private fb: FormBuilder, private storeService: StoreService, private router: Router,
              private notifService: NotifsService, private unitService: UnitsService, private voucherService: VoucherService) {
    this.formStore();
  }

  ngOnInit(): void {
    this.getStores();
  }

  //initialisation du formulaire de création type de bon
  formStore(){
    this.storeForm = this.fb.group({
      localization: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  //ouverture du modal
  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
  }

  createStore(){
    console.log(this.storeForm.value)
    this.getVouchers()
    this.store.localization = this.storeForm.value
    this.isLoading.next(true);
    this.storeService.createStore(this.storeForm.value as Store).subscribe(
      resp => {
        console.log(resp)
        // this.unit.idStore = resp.internalReference
        // this.unit.quantityNotebook = 0
        // this.typeVouchers.forEach(tv => {
        //   this.unit.idTypeVoucher = tv.internalReference
        //   this.unitService.createUnit(this.unit).subscribe()
        // })
        this.stores.push(resp)
        this.annuler()
        this.isLoading.next(false);
        this.notifService.onSuccess('enregistrement effectué')
      },
      error => {
        this.notifService.onError(error.error.message, '')
        this.isLoading.next(false);
      }
    )
  }

  getStores(){
    console.log(this.storeForm.value)
    this.storeService.getStore().subscribe(
      resp => {
        this.stores = resp.content
      },
    )
  }

  getVouchers(){
    this.voucherService.getTypevoucher().subscribe(
      resp => {
        this.typeVouchers = resp.content
      },
    )
  }
  annuler() {
    this.formStore();
    this.store = new Store()
    this.modalService.dismissAll()
  }

  delete(store: Store, index:number) {
    this.isLoading.next(true);
    this.storeService.deleteStore(store.internalReference).subscribe(
      resp => {
        // console.log(resp)
        this.stores.splice(index, 1)
        this.isLoading.next(false);
        this.notifService.onSuccess("magasin de "+store.localization+" supprimé")
      },
      error => {
        // this.notifServices.onError(error.error.message,"échec de suppression")
        this.isLoading.next(false);
      }
    )
  }

  deleteStore(store: Store, index: number) {
    Swal.fire({
      title: 'Supprimer Magasin',
      html: "Voulez-vous vraiment supprimer le magasin de "+ store.localization.toString().bold() + " ?",
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
        this.delete(store, index)
      }
    })
  }

  updateStoreModal(mymodal: TemplateRef<any>, store: Store) {
    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
    this.store = store
    this.modalTitle = 'Modifier magasin'
  }

  updateStore() {
    this.isLoading.next(true);
    console.log(this.storeForm.controls['localization'].value)
    this.storeService.updateStore(this.storeForm.value, this.store.internalReference).subscribe(
      resp => {
        this.isLoading.next(false);
        const index = this.stores.findIndex(store => store.internalReference === resp.internalReference);
        this.stores[ index ] = resp;
        this.notifService.onSuccess("magasin modifié avec succès!")
        this.annuler()
      },
      error => {
        this.isLoading.next(false);
      }
    )
  }

  showDetails(store: Store) {
    this.router.navigate(['/entrepots/details', store.internalReference])
    // [routerLink]=""
  }
}
