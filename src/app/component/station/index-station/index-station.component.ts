import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import Swal from "sweetalert2";
import {StationService} from "../../../_services/stations/station.service";
import {Station} from "../../../_interfaces/station";

@Component({
  selector: 'app-index-station',
  templateUrl: './index-station.component.html',
  styleUrls: ['./index-station.component.css']
})
export class IndexStationComponent implements OnInit {

  stations: Station[] = [];
  station: Station = new Station();
  @ViewChild('mymodal', { static: false }) viewMe?: ElementRef<HTMLElement>;
  stationForm: FormGroup ;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  modalTitle = 'Enregistrer une nouvelle station'

  constructor(private fb: FormBuilder, private modalService: NgbModal, private stationService: StationService, private notifService: NotifsService) {
    this.formStation();
  }

  ngOnInit(): void {
    this.getStations();
  }

  //formulaire de création
  formStation(){
    this.stationForm = this.fb.group({
      localization: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
      balance: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
    });
  }

  //récupération de la liste des stations
  getStations(){
    this.stationService.getStations().subscribe(
      resp => {
        console.log(resp)
        this.stations = resp.content
        this.notifService.onSuccess('chargement des stations')
      },
    )
  }

  //save store house
  saveStation(){
    this.isLoading.next(true);

    this.stationService.createStation(this.stationForm.value).subscribe(
      resp => {
        this.stations.push(resp)
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
    this.formStation();
    this.station = new Station()
    this.modalService.dismissAll()
  }
  //open modal
  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  deleteStation(station: Station, index: number) {
    Swal.fire({
      title: 'Supprimer station',
      html: "Voulez-vous vraiment supprimer "+ station.designation.toString().bold() + " de la liste de vos stations ?",
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
        this.stationService.deleteStation(station.internalReference).subscribe(
          resp => {
            this.stations.splice(index, 1)
            this.isLoading.next(false)
            this.notifService.onSuccess(`station ${station.designation.toString().bold()} supprimée avec succès !`)
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

  updateStationModal(mymodal: TemplateRef<any>, station: Station) {
    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    this.station = station
    this.modalTitle = 'Modifier station'
  }

  updateStation() {
    this.isLoading.next(true);

    this.stationService.updateStation(this.stationForm.value, this.station.internalReference).subscribe(
      resp => {
        this.isLoading.next(false);
        // on recherche l'index du client dont on veut faire la modification dans liste des clients
        const index = this.stations.findIndex(station => station.internalReference === resp.internalReference);
        this.stations[ index ] = resp;
        this.notifService.onSuccess("station modifiée avec succès!")
        this.annuler()
      },
      error => {
        this.isLoading.next(false);
      }
    )
  }

}
