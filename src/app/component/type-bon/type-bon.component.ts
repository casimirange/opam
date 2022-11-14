import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VoucherService} from "../../_services/voucher/voucher.service";
import {Status, TypeVoucher} from "../../_interfaces/typeVoucher";
import {BehaviorSubject} from "rxjs";
import {NotifsService} from "../../_services/notifications/notifs.service";

@Component({
  selector: 'app-type-bon',
  templateUrl: './type-bon.component.html',
  styleUrls: ['./type-bon.component.css']
})
export class TypeBonComponent implements OnInit {

  voucherForm: FormGroup;
  vouchers: TypeVoucher[] = [];
  voucher: TypeVoucher;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  constructor(private modalService: NgbModal, private fb: FormBuilder, private voucherService: VoucherService, private notifService: NotifsService) {
    this.formVoucherType();
    this.voucher = new class implements TypeVoucher {
      amount: 0;
      createdAt: Date;
      designation: string;
      id: number;
      internalReference: number;
      status: Status;
      updateAt: Date;
    }
  }

  ngOnInit(): void {
    this.getVouchers();
  }

  //initialisation du formulaire de création type de bon
  formVoucherType(){
    this.voucherForm = this.fb.group({
      designation: ['', ],
      amount: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
    });
  }

  //ouverture du modal
  open(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
  }

  createVoucher(){
    console.log(this.voucherForm.value)
    this.isLoading.next(true);
    this.voucher.designation = this.voucherForm.controls['designation'].value
    this.voucher.amount = this.voucherForm.controls['amount'].value
    this.voucherService.createTypevoucher(this.voucher).subscribe(
      resp => {
        console.log(resp)
        this.vouchers.push(resp)
        this.annuler()
        this.isLoading.next(false);
        this.notifService.onSuccess('type de coupon créé')
      },
      error => {
        this.notifService.onError(error.error.message, '')
        this.isLoading.next(false);
      }
    )
  }

  getVouchers(){
    console.log(this.voucherForm.value)
    this.voucherService.getTypevoucher().subscribe(
      resp => {
        console.log(resp)
        this.vouchers = resp.content
        this.notifService.onSuccess('chargement des types de coupons')
      },
      error => {
        this.notifService.onError(error.error.message, '')
      }
    )
  }

  annuler() {
    this.formVoucherType();
    this.modalService.dismissAll()
  }

  delete(voucher: TypeVoucher, index: number) {
    this.isLoading.next(true);
    this.voucherService.deleteTypevoucher(voucher.internalReference).subscribe(
      resp => {
        // console.log(resp)
        this.vouchers.splice(index, 1)
        this.isLoading.next(false);
        this.notifService.onSuccess("type de bon de "+voucher.amount+" supprimé")
      },
      error => {
        // this.notifServices.onError(error.error.message,"échec de suppression")
        this.isLoading.next(false);
      }
    )
  }
}
