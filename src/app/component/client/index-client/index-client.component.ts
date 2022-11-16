import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IClient, TypeClient} from "../../../_interfaces/client";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {ClientService} from "../../../_services/clients/client.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {AppState} from "../interface/app-state";
import {DataState} from "../enum/data.state.enum";
import {CustomResponseCliennts} from "../../../_interfaces/custom-response-cliennts";
import {catchError, map, startWith} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";


@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.scss']
})
export class IndexClientComponent implements OnInit {

  clients: IClient[] = [];
  client: IClient = new IClient();
  clientType: string;
  displaySearchBar: boolean = false;
  clientForm: FormGroup;
  appState$: Observable<AppState<CustomResponseCliennts>>;
  readonly DataState = DataState;
  private dataSubjects = new BehaviorSubject<CustomResponseCliennts>(null);
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  name = ''
  compagny = ''
  date = ''
  internalRef = ''
  p: number = 1;

  page: number = 0;
  totalPages: number;
  totalElements: number;
  size: number;

  modalTitle = 'Enregistrer nouveau client'

  @ViewChild('mymodal', {static: false}) viewMe?: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private clientService: ClientService, private router: Router,
              private notifService: NotifsService) {
    this.formClient();
  }

  ngOnInit(): void {
    this.isLoading.next(true);
    this.clientService.getAllClients().subscribe(
      resp => {
        this.clients = resp.content;
        this.isLoading.next(false);
        console.log(resp)
        this.size = resp.size
        this.totalPages = resp.totalPages
        this.totalElements = resp.totalElements
        this.notifService.onSuccess('Liste des clients')
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

  pageChange(event: number){
    this.page = event
  }

//initialisation du formulaire de création client
  formClient() {
    this.clientForm = this.fb.group({
      completeName: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[2,6][0-9]{8}'), Validators.minLength(9), Validators.maxLength(9)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      gulfcamAccountNumber: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
      rccm: ['', [Validators.required, Validators.minLength(2)]],
      typeClient : ['', [Validators.required]],
    });
  }

  // searchBar() {
  //   this.displaySearchBar = !this.displaySearchBar;
  // }

  saveClient() {
    this.isLoading.next(true);
    this.clientService.addClient(this.clientForm.value as IClient).subscribe(
      resp => {
        this.clients.push(resp)
        this.isLoading.next(false);
        this.notifService.onSuccess("client créé avec succès!")
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

  annuler() {
    this.formClient();
    this.clientType = ''
    this.client = new IClient()
    this.modalService.dismissAll()
  }

  open(content: any) {
    this.annuler()
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    this.modalTitle = 'Enregistrer nouveau client'
  }

  deleteClient(client: IClient, index: number) {

      Swal.fire({
        title: 'Supprimer client',
        html: "Voulez-vous vraiment supprimer "+ client.completeName.bold() + " de la liste de vos clients ?",
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
          this.clientService.deleteClient(client.internalReference).subscribe(
            resp => {
              this.clients.splice(index, 1)
              this.isLoading.next(false)
              this.notifService.onSuccess(client.completeName.bold() +' supprimé avec succès !')
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

  detailsClient(client: IClient) {
    this.router.navigate(['/clients/', client.internalReference])
  }

  updateClientModal(mymodal: TemplateRef<any>, client: IClient) {
    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    this.client = client
    this.clientType = client.typeClient.name
    this.modalTitle = 'Modifier client'
  }

  updateClient() {
    this.isLoading.next(true);
    this.clientService.updatelient(this.clientForm.value as IClient, this.client.internalReference).subscribe(
      resp => {
        this.isLoading.next(false);
        // on recherche l'index du client dont on veut faire la modification dans liste des clients
        const index = this.clients.findIndex(client => client.internalReference === resp.internalReference);
        this.clients[ index ] = resp;
        this.notifService.onSuccess("client modifié avec succès!")
        this.annuler()
      },
      error => {
        this.isLoading.next(false);
        if (error.error.message.includes('JWT expired')){

        }else {
          this.notifService.onError(error.error.message, '')
        }
      }
    )
  }
}
