import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status, TypeVoucher} from "../../../_interfaces/typeVoucher";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {Store} from "../../../_interfaces/store";
import {StoreService} from "../../../_services/store/store.service";
import {BehaviorSubject} from "rxjs";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {PaiementMethod} from "../../../_interfaces/paiement";

@Component({
  selector: 'app-dashboard-magasin',
  templateUrl: './dashboard-magasin.component.html',
  styleUrls: ['./dashboard-magasin.component.css']
})
export class DashboardMagasinComponent implements OnInit {

  storeForm: FormGroup;
  stores: Store[] = [];
  store: Store;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  constructor(private modalService: NgbModal, private fb: FormBuilder, private storeService: StoreService, private notifService: NotifsService) {
    this.formStore();
    this.store = new Store ()
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
    this.store.localization = this.storeForm.value
    this.isLoading.next(true);
    this.storeService.createStore(this.storeForm.value).subscribe(
      resp => {
        console.log(resp)
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
      // error => {
      //   if (error.error.message.includes('JWT expired')){
      //     console.log('foutu tesst')
      //   }else {
      //     this.notifService.onError(error.error.message, '')
      //   }
      // }
    )
  }
  annuler() {
    this.formStore();
    this.modalService.dismissAll()
  }

  delete(store: Store, index:number) {
    this.isLoading.next(true);
    this.storeService.deleteStore(store.internalReference).subscribe(
      resp => {
        // console.log(resp)
        this.stores.splice(index, 1)
        this.isLoading.next(false);
        this.notifService.onSuccess("magasin "+store.localization+" supprimé")
      },
      error => {
        // this.notifServices.onError(error.error.message,"échec de suppression")
        this.isLoading.next(false);
      }
    )
  }
}
