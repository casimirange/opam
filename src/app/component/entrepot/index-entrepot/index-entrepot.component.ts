import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreHouse} from "../../../_interfaces/storehouse";
import {Status, Store} from "../../../_interfaces/store";
import {StoreService} from "../../../_services/store/store.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {BehaviorSubject} from "rxjs";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

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
  modalTitle = 'Enregistrer un nouvel entrepot'
  magasin: string

  constructor(private fb: FormBuilder, private modalService: NgbModal, private storeHouseService: StoreHouseService,
              private storeService: StoreService, private notifService: NotifsService, private router: Router) {
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
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  //récupération de la liste des magasins
  getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.stores = resp.content
      },
      // error => {
        // this.notifService.onError(error.error.message, 'Erreur de chargement des magasins')
      // }
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
      // error => {
      //   this.notifService.onError(error.error.message, 'Erreur de chargement des magasins')
      // }
    )
  }

  //save store house
  saveStoreHouse(){
    this.isLoading.next(true);
    this.store = this.stores.find(store => store.localization === this.storeHouseForm.controls['store'].value)
    this.storeHouse.idStore = this.store.internalReference
    this.storeHouse.type = this.storeHouseForm.controls['type'].value
    this.storeHouse.name = this.storeHouseForm.controls['name'].value
    this.storeHouseService.createStoreHouse(this.storeHouse).subscribe(
      resp => {
        /**
         * je dois gérer cette partie
         */
        // this.storeHouses.push(resp)
        this.getStoreHouses()
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

  annuler() {
    this.formStoreHouse();
    this.storeHouse = new StoreHouse()
    this.modalService.dismissAll()
    this.magasin = ''
  }
  //open modal
  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  deleteStoreHouse(storeHouse: StoreHouse, index: number) {
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
    // this.magasin = this.stores.find(store => store.internalReference === storeHouse.idStore).localization
    this.modalTitle = 'Modifier entrepot'
  }

  updateStoreHouse() {
    this.isLoading.next(true);
    this.store = this.stores.find(store => store.localization === this.storeHouseForm.controls['store'].value)
    console.log(this.store)
    const updateStoreHouse = {
      "idStore" : 0,
      "type" : '',
      "name" : '',
    }
    updateStoreHouse.type = this.storeHouseForm.controls['type'].value
    updateStoreHouse.name = this.storeHouseForm.controls['name'].value
    updateStoreHouse.idStore = this.store.internalReference

    this.storeHouseService.updateStoreHouse(updateStoreHouse, this.storeHouse.internalReference).subscribe(
      resp => {
        console.log(resp)
        this.isLoading.next(false);
        // on recherche l'index du client dont on veut faire la modification dans liste des clients
        const index = this.storeHouses.findIndex(storeHouse => storeHouse.internalReference === resp.internalReference);
        // this.storeHouses[ index ] = resp;
        this.storeHouses[ index ].internalReference = resp.internalReference;
        this.storeHouses[ index ].localisationStore = resp.localisationStore;
        this.storeHouses[ index ].name = resp.name;
        this.storeHouses[ index ].updateAt = resp.updateAt;
        this.getStoreHouses()
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

  showDetails(storeHouse: StoreHouse) {
    this.router.navigate(['/entrepots/details', storeHouse.internalReference])
    // [routerLink]=""
  }
}
