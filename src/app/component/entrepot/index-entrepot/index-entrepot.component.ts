import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreHouse} from "../../../_interfaces/storehouse";
import {Status, Store} from "../../../_interfaces/store";
import {StoreService} from "../../../_services/store/store.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-index-entrepot',
  templateUrl: './index-entrepot.component.html',
  styleUrls: ['./index-entrepot.component.css']
})
export class IndexEntrepotComponent implements OnInit {

  storeHouses: StoreHouse[] = [];
  storeHouse: StoreHouse = new StoreHouse();
  @ViewChild('mymodal', { static: false }) viewMe?: ElementRef<HTMLElement>;
  storeHouseForm: FormGroup ;
  storeHouseType = ['stockage', 'vente']
  stores: Store[] = [];
  store: Store = new Store();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  constructor(private fb: FormBuilder, private modalService: NgbModal, private storeHouseService: StoreHouseService, private storeService: StoreService, private notifService: NotifsService) {
    this.formStoreHouse();
  }

  ngOnInit(): void {
    this.getStores();
    this.getStoreHouses();
  }

  //formulaire de création
  formStoreHouse(){
    this.storeHouseForm = this.fb.group({
      store: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  //récupération de la liste des magasins
  getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.stores = resp.content
      },
      error => {
        this.notifService.onError(error.error.message, 'Erreur de chargement des magasins')
      }
    )
  }

  //récupération de la liste des entrepots
  getStoreHouses(){
    this.storeHouseService.getStoreHouses().subscribe(
      resp => {
        console.log(resp)
        this.storeHouses = resp.content
        this.notifService.onSuccess('chargement des entrepots')
      },
      error => {
        this.notifService.onError(error.error.message, 'Erreur de chargement des magasins')
      }
    )
  }

  //save store house
  saveStoreHouse(){
    this.isLoading.next(true);
    this.store = this.stores.filter(store => store.localization === this.storeHouseForm.controls['store'].value)[0]
    this.storeHouse.idStore = this.store.internalReference
    this.storeHouse.type = this.storeHouseForm.controls['type'].value
    this.storeHouseService.createStoreHouse(this.storeHouse).subscribe(
      resp => {
        this.storeHouses.push(resp)
        this.isLoading.next(false);
        this.notifService.onSuccess('enregistrement effectué')
        this.annuler()
      },
      error => {
        this.isLoading.next(false);
        this.notifService.onError(error.error.message, 'Erreur lors de la création')
      }
    )
  }

  annuler() {
    this.formStoreHouse();
    this.modalService.dismissAll()
  }
  //open modal
  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }
}
