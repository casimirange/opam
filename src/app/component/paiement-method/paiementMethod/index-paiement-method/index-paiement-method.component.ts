import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StoreService} from "../../../../_services/store/store.service";
import {Store} from "../../../../_interfaces/store";
import {PaiementMethod} from "../../../../_interfaces/paiement";
import {PaiementService} from "../../../../_services/paiement/paiement.service";
import {NotifsService} from "../../../../_services/notifications/notifs.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-index-paiement-method',
  templateUrl: './index-paiement-method.component.html',
  styleUrls: ['./index-paiement-method.component.css']
})
export class IndexPaiementMethodComponent implements OnInit {

  buyForm: FormGroup;
  paiementMethods: PaiementMethod[] = [];
  paiementMethod: PaiementMethod = new PaiementMethod();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  constructor(private modalService: NgbModal, private fb: FormBuilder, private paiementService: PaiementService, private notifServices: NotifsService) {
    this.formPaiement()
  }

  ngOnInit(): void {
    this.getPaiements();
  }

  //initialisation du formulaire de création type de bon
  formPaiement(){
    this.buyForm = this.fb.group({
      designation: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  createPaiementMethod(){
    // console.log(this.storeForm.value)
    this.isLoading.next(true);
    this.paiementMethod.designation = this.buyForm.value
    this.paiementService.createPaymentMethod(this.buyForm.value).subscribe(
      resp => {
        // console.log(resp)
        this.paiementMethods.push(resp)
        this.isLoading.next(false);
        this.notifServices.onSuccess("nouvelle méthode de paiement créée")
        this.annuler()
      },
      error => {
        this.notifServices.onError(error.error.message,"échec de création")
        this.isLoading.next(false);
      }
    )
  }
  annuler() {
    this.formPaiement();
    this.modalService.dismissAll()
  }
  getPaiements(){
    // console.log(this.storeForm.value)
    this.isLoading.next(true);
    this.paiementService.getPaymentMethods().subscribe(
      resp => {
        console.log(resp)
        this.paiementMethods = resp.content
        this.isLoading.next(false);
        this.notifServices.onSuccess('listes des méthodes de paiement')
      },
      error => {
        this.notifServices.onError(error.error.message, '')
        this.isLoading.next(false);
      }
    )
  }

  //ouverture du modal
  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
  }

  delete(payment: PaiementMethod, index:number) {
    this.isLoading.next(true);
    this.paiementService.deletePaymentMethod(payment.internalReference).subscribe(
      resp => {
        // console.log(resp)
        this.paiementMethods.splice(index, 1)
        this.isLoading.next(false);
        this.notifServices.onSuccess("méthode de paiement supprimée")
        this.annuler()
      },
      error => {
        this.notifServices.onError(error.error.message,"échec de suppression")
        this.isLoading.next(false);
      }
    )
  }
}
