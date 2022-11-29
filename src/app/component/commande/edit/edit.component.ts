import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../_services/order/order.service";
import {Order} from "../../../_interfaces/order";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {ActivatedRoute} from "@angular/router";
import {StoreService} from "../../../_services/store/store.service";
import {ClientService} from "../../../_services/clients/client.service";
import {Client, TypeClient} from "../../../_interfaces/client";
import {Store} from "../../../_interfaces/store";
import {ProductService} from "../../../_services/product/product.service";
import {Products} from "../../../_interfaces/products";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {PaiementService} from "../../../_services/paiement/paiement.service";
import {PaiementMethod} from "../../../_interfaces/paiement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  order: Order = new Order();
  vouchers: TypeVoucher[] = []
  client: Client = new Client();
  store: Store = new Store();
  products: Products[] = []
  paymentMethods: PaiementMethod[] = []
  statut: string;
  amountOrder: number
  editForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  selectedFile = null;
  constructor(private orderService: OrderService,  private notifsService: NotifsService, private route: ActivatedRoute,
              private clientService: ClientService, private storeService: StoreService, private productService: ProductService,
              private voucherService: VoucherService, private paymentService: PaiementService, private fb: FormBuilder) {
    this.formOrder()
  }

  ngOnInit(): void {
    this.getOrder()
    this.getVouchers()
    this.getPaymentMethods()
  }

  formOrder(){
    this.editForm = this.fb.group({
      method: [''],
      peimentRef: [''],
      file: [''],
    });
  }

  getOrder(){
    const id = this.route.snapshot.paramMap.get('id');

      this.orderService.getOrderByRef(parseInt(id)).subscribe(
        resp => {
          this.order = resp
          this.statut = this.order.status.name
          this.clientService.findClient(this.order.idClient).subscribe(
            resp => {
              this.client = resp;
              console.log(resp)
            }
          )
          this.storeService.getStoreByInternalref(this.order.idStore).subscribe(
            resp => {
              this.store = resp
            }
          )
          this.productService.getProducts(this.order.internalReference).subscribe(
            resp => {
              console.log('produits',resp)
              this.products = resp.content
            }
          )
        },
        // err => {
        //   this.notifsService.onError(err.error.message, 'échec chargement de la commande')
        // }
      )

  }

  getVouchers(): void{
    console.log(this.order)
    this.voucherService.getTypevoucher().subscribe(
      resp => {
        this.vouchers = resp.content;
        // for (let voucher of this.vouchers){
        //   voucher.internalReference === ord.idTypeVoucher ? voucher.amount * prod.quantityNotebook : ''
        // }
      }
    )
  }

  getPaymentMethods(){
    this.paymentService.getPaymentMethods().subscribe(
      resp => {
        this.paymentMethods = resp.content
        console.log(resp)
      },
      // error => {
      //   this.notifsService.onError(error.error.message, 'échec chargement magasins')
      // }
    )
  }

  acceptOrder(){
    this.order.idFund = parseInt(localStorage.getItem('uid'))
    this.order.idPaymentMethod = this.editForm.controls['method'].value
    this.order.paymentReference = this.editForm.controls['peimentRef'].value
    const docType = 'pdf'
    const file : File = this.editForm.controls['file'].value
    this.currentFileUpload = this.selectedFiles.item(0);

    this.orderService.acceptOrder(this.order.internalReference, this.order.idFund, this.order.idPaymentMethod, this.order.paymentReference,
      docType, this.currentFileUpload).subscribe(
      resp => {
        this.notifsService.onSuccess('Commande Acceptée')
        this.refreshOrder()
      }
    )
  }

  payOrder(){
    this.order.idManagerCoupon = parseInt(localStorage.getItem('uid'))

    this.orderService.payOrder(this.order.internalReference, this.order.idManagerCoupon).subscribe(
      resp => {
        this.refreshOrder()
        this.notifsService.onSuccess('Commande Payée')
      }
    )

  }

  generateBoredereau(){
    if (this.statut == "PAID"){
      this.orderService.deliveryOrder(this.order.internalReference, this.order.idManagerCoupon).subscribe(
        respProd => {
          console.log('delivery', respProd)
          const file = new Blob([respProd], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          this.notifsService.onSuccess('Commande en cours de livraison')
          this.refreshOrder()
          // this.isLoading.next(false);
        },
      )
    }
  }

  refreshOrder(){
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderByRef(parseInt(id)).subscribe(
      resp => {
        this.order = resp
        this.statut = this.order.status.name
      }
    )
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  getProforma(){
    console.log('test')
    this.orderService.getProforma(this.order.internalReference).subscribe(
      respProd => {
        console.log('proforma', respProd)
        const file = new Blob([respProd], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // this.isLoading.next(false);
      },
    )
  }

}
