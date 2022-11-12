import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IClient} from "../../../_interfaces/client";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ClientService} from "../../../_services/clients/client.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {AppState} from "../interface/app-state";
import {DataState} from "../enum/data.state.enum";
import {CustomResponseCliennts} from "../../../_interfaces/custom-response-cliennts";
import {catchError, map, startWith} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifsService} from "../../../_services/notifications/notifs.service";

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.scss']
})
export class IndexClientComponent implements OnInit {

  clients: IClient[] = [];
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




  @ViewChild('mymodal', {static: false}) viewMe?: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private clientService: ClientService, private notifService: NotifsService) {
    this.formClient();
  }

  ngOnInit(): void {
    this.isLoading.next(true);
    this.clientService.getAllClients().subscribe(
      resp => {
        this.isLoading.next(false);
        this.clients = resp.content;
        console.log(resp)
        this.size = resp.size
        this.totalPages = resp.totalPages
        this.totalElements = resp.totalElements
        this.notifService.onSuccess('Liste des clients')
      },
      error => {
        this.isLoading.next(false);
        if (error.error.message.includes('JWT expired')){

        }else {
          this.notifService.onError(error.error.message, 'Erreur')
        }

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
      typeClient: ['', [Validators.required]],
    });
  }

  searchBar() {
    this.displaySearchBar = !this.displaySearchBar;
  }

  getClients() {
    this.appState$ = this.clientService.clients$
      .pipe(
        map(response => {
          console.log('la reponse', response)
          this.dataSubjects.next(response); //on met la liste des serveurs dans la variable datasubject pour pouvoir l'utiliser ailleurs
          // this.notificationService.onDefault(response.message);
          return {
            dataState: DataState.LOADED_STATE,
            appData: {...response, content: {clients: response.content.clients}}
          };
        }),
        startWith({dataState: DataState.LOADING_STATE, appData: null}),
        catchError((error => {
          // this.notificationService.onError(error);
          return of({dataState: DataState.ERROR_STATE, error: error});
        }))
      );
  }

  saveClient() {
    this.isLoading.next(true);
    this.clientService.addClient(this.clientForm.value as IClient).subscribe(
      resp => {
        this.isLoading.next(false);
        this.clients.push(resp)
        this.notifService.onSuccess("client créé avec succès!")
        this.annuler()
      },
      err => {
        this.isLoading.next(false);
        this.notifService.onError(err.error.message, 'échec lors de la création')
      }
    )
  }

  annuler() {
    this.formClient();
    this.modalService.dismissAll()
  }

  searchByName() {
    if (this.name == "") {
      this.ngOnInit()
    } else {
      let tab = [];
      tab = this.clients.filter(res => {
        return res.completeName.includes(this.name.toLowerCase());
      })
      this.clients = tab
      console.log(this.name.toLowerCase())
      console.log(tab)
    }
  }

  searchByInternalRef() {
    if (this.internalRef == "") {
      this.clients = [...this.clients]
    } else {
      this.clients = [...this.clients.filter(res => {

        // return res.completeName.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
        return res.internalReference.toLocaleString().match(this.internalRef.toLocaleLowerCase())
          // res.createdAt.getDate() === this.date.getDate(),


      })]
    }
  }

  key = 'id'
  reverse = false;
  sort(key: any){
    this.key = key
    this.reverse = !this.reverse
  }

  // searchByCompagny() {
  //   if (this.compagny == "") {
  //     this.clients = this.clients
  //   } else {
  //     this.clients = this.clients.filter(res => {
  //       return res.companyName.toLocaleLowerCase().match(this.compagny.toLocaleLowerCase())
  //     })
  //   }
  // }
  //
  // searchByDate() {
  //   // if (this.date == "") {
  //   //   this.clients = this.clients
  //   // } else {
  //     this.clients = this.clients.filter(res => {
  //       return res.createdAt.getDate().toLocaleString().match(this.date.getDate().toLocaleString())
  //     })
  //   // }
  // }
  //
  // searchByInternal() {
  //   if (this.internalRef == "") {
  //     this.clients = this.clients
  //   } else {
  //     this.clients = this.clients.filter(res => {
  //       return res.internalReference.toLocaleString().match(this.internalRef.toLocaleLowerCase())
  //     })
  //   }
  // }


  open(content: any) {
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }
}
