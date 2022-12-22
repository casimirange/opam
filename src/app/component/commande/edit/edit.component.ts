import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import Swal from "sweetalert2";
import {BehaviorSubject} from "rxjs";
import {CouponService} from "../../../_services/coupons/coupon.service";
import {StatusOrderService} from "../../../_services/status/status-order.service";

export class Product{
  coupon: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  order: Order = new Order();
  vouchers: TypeVoucher[] = []
  voucher: TypeVoucher = new TypeVoucher()
  client: Client = new Client();
  store: Store = new Store();
  products: Products[] = []
  paymentMethods: PaiementMethod[] = []
  statut: string;
  amountOrder: number
  editForm: FormGroup;
  selectPdfForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  selectedFile = null;
  addCouponClientForm: FormGroup ;
  clF: any;
  orF: any;
  canaux = ['Appel', 'Courier papier', 'Email', 'Sur site']
  stores: Store[] = [];
  typeVoucher = [3000, 5000, 10000]
  tabProducts: string[] = [];
  tabProd: Product;
  Products: Products[] = [];
  Product: Products = new Products();
  totalOrder: number;
  roleUser = localStorage.getItem('userAccount').toString();
  name = ''
  refCli = ''
  date = ''
  internalRef = ''
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  constructor(private orderService: OrderService,  private notifsService: NotifsService, private route: ActivatedRoute,
              private clientService: ClientService, private storeService: StoreService, private productService: ProductService,
              private voucherService: VoucherService, private paymentService: PaiementService, private fb: FormBuilder,
              private statusService: StatusOrderService, private couponService: CouponService) {
    this.formOrder()
    this.formAddCarnet()
    this.orF = this.addCouponClientForm.controls;
    this.selectPdfForm = this.fb.group({
      pdf: ['']
    });
  }

  ngOnInit(): void {
    this.getOrder()
    // this.getVouchers(591577792)
    this.getPaymentMethods()
  }

  formOrder(){
    this.editForm = this.fb.group({
      method: [''],
      peimentRef: [''],
      file: [''],
      fileBordereau: [''],
      reason: [''],
    });
  }

  formAddCarnet(){
    this.addCouponClientForm = this.fb.group({
      coupon: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
    });
  }

  getOrder(){
    const id = this.route.snapshot.paramMap.get('id');

      this.orderService.getOrderByRef(parseInt(id)).subscribe(
        resp => {
          this.order = resp
          console.log('commande', resp)
          this.statut = this.order.status.name
          this.clientService.findClient(this.order.idClient).subscribe(
            resp => {
              console.log(resp)
              this.client = resp;
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
        this.formOrder()
      }
    )
  }

  endOrder(){
    this.order.idManagerCoupon = parseInt(localStorage.getItem('uid'))
    const docType = 'pdf'
    const file : File = this.editForm.controls['fileBordereau'].value
    this.currentFileUpload = this.selectedFiles.item(0);

    this.orderService.validOrder(this.order.internalReference, this.order.idManagerCoupon, this.currentFileUpload).subscribe(
      resp => {
        this.notifsService.onSuccess('Commande Terminée')
        this.formOrder()
        this.refreshOrder()
      }
    )
  }

  payOrder(){
    this.order.idManagerCoupon = parseInt(localStorage.getItem('uid'))

    this.orderService.payOrder(this.order.internalReference, this.order.idManagerCoupon).subscribe(
      resp => {
        this.refreshOrder()
        this.formOrder()
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

  generatePreuve(){
    const docType = 'pdf'
    const type = 'INVOICE'
    this.orderService.getFile(this.order.internalReference, type, docType).subscribe(
      respProd => {
        console.log('reçu', respProd)
        const file = new Blob([respProd], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // this.isLoading.next(false);
      },
    )
  }

  generateReçu(){
    const type = 'INVOICE'
    this.orderService.getReçu(this.order.internalReference, type).subscribe(
      respProd => {
        const file = new Blob([respProd], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // this.isLoading.next(false);
      },
    )
  }

  generateBonLivraison(){
    const type = 'DELIVERY'
    this.orderService.getReçu(this.order.internalReference, type).subscribe(
      respProd => {
        const file = new Blob([respProd], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // this.isLoading.next(false);
      },
    )
  }

  generateBonCommande(){
    const docType = 'pdf'
    const type = 'DELIVERY'
    this.orderService.getFile(this.order.internalReference, type, docType).subscribe(
      respProd => {

        const file = new Blob([respProd], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // this.isLoading.next(false);
      },
    )
  }

  deny(order: Order) {

    Swal.fire({
      title: 'Annuler commande',
      html: "Voulez-vous vraiment annuler la commande N° "+ order.internalReference.toString().bold() + " ?",
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
        this.denyOrder()
      }
    })

  }

  denyOrder() {
    this.order.idManagerCoupon = parseInt(localStorage.getItem('uid'))
    this.order.reasonForCancellation = this.editForm.controls['reason'].value
    if (this.order.reasonForCancellation == ''){
      this.notifsService.onError('veuillez préciser la raison d\'annulation de la commande', '')
    }else {
      this.orderService.denyOrder(this.order.internalReference, this.order.idManagerCoupon, this.order.reasonForCancellation).subscribe();
      this.refreshOrder()
      this.notifsService.onSuccess('commande annulée avec succès')
    }

  }

  addProduct(){
    this.tabProd = new Product();

    this.tabProd.coupon = this.addCouponClientForm.controls['coupon'].value;
    // this.tabProducts.push(this.tabProd)

    console.log('coupons', this.tabProducts)

    this.couponService.affectCouponClient(this.addCouponClientForm.controls['coupon'].value.toString(), this.order.idClient).subscribe();
    // this.refreshOrder()
    this.notifsService.onSuccess('carnet attribué avec succès')
    this.orF['coupon'].clear
    this.orF['coupon'].reset();

  }

  generatePDF($event){
    const select = $event.target.value
    // if (select == 'facture'){
    //   this.getProforma();
    // }
    // if (select == 'proforma'){
    //   this.getProforma();
    // }
    switch (select) {
      case 'bordereau': this.generateBoredereau();
        break;
      case 'preuve': this.generatePreuve();
        break;
      case 'préfacture': this.getProforma();
        break;
      case 'bonCommand': this.generateBonCommande();
        break;
      case 'reçu': this.generateReçu();
        break;
      // case 'bonLivraison': this.generateBonLivraison();
      //   break;
    }
    // if (select == 'bordereau'){
    //
    // }
    // if (select == 'preuve'){
    //   this.generatePreuve()
    // }
    // if (select == 'préfacture'){
    //   this.getProforma();
    // }
    // if (select == 'bonCommand'){
    //   this.generateBonCommande();
    // }
  }

  getVouchers(): void{
      this.voucherService.getTypevoucher().subscribe(
      resp => {
        this.vouchers = resp;
        console.log(resp)
      })
  }

  // getVouchers(internalRef: Products): void{
  //
  // }

  getAmount(amount: number): number {
    console.log('amount', amount)
    return amount
  }

  getStatuts(status: string): string {
    return this.statusService.allStatus(status)
  }
}
