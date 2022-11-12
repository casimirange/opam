import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IClient} from "../../../_interfaces/client";

import  Swal from 'sweetalert2/dist/sweetalert2.js';
import {ClientService} from "../../../_services/clients/client.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IndexClientComponent} from "../../client/index-client/index-client.component";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {Products} from "../../../_interfaces/products";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {Store} from "../../../_interfaces/store";
import {StoreService} from "../../../_services/store/store.service";
import {Order} from "../../../_interfaces/order";
import {ProductService} from "../../../_services/product/product.service";
import {OrderService} from "../../../_services/order/order.service";
import {BehaviorSubject} from "rxjs";

export class Product{
  quantity: number;
  voucher: number;
  total?: number
}
@Component({
  selector: 'app-index-command',
  templateUrl: './index-command.component.html',
  styleUrls: ['./index-command.component.css']
})
export class IndexCommandComponent implements OnInit {

  title = 'Enregistrer nouvelle commande';
  clients: IClient[] = [];
  client: IClient;
  store: Store;
  showClientForm = false;
  clientForm: FormGroup ;
  orderForm: FormGroup ;
  clF: any;
  orF: any;
  canaux = ['Appel', 'Courier papier', 'Email', 'Sur site']
  stores: Store[] = [];
  typeVoucher = [3000, 5000, 10000]
  tabProducts: Product[] = [];
  tabProd: Product;
  Products: Products[] = [];
  Product: Products = new Products();
  totalOrder: number;
  vouchers: TypeVoucher[] = [];
  voucher: TypeVoucher = new TypeVoucher()
  orders: Order[] = [];
  order: Order = new Order();
  @ViewChild('orderModal', { static: false }) commandModal?: ElementRef<HTMLElement>;
  name = ''
  refCli = ''
  date = ''
  internalRef = ''
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  constructor(private fb: FormBuilder, private modalService: NgbModal, private clientService: ClientService,
              private voucherService: VoucherService, private notifsService: NotifsService, private storeService: StoreService,
              private productService: ProductService, private orderService: OrderService) {
    this.formClient();
    this.formOrder();
    this.clF = this.clientForm.controls;
    this.orF = this.orderForm.controls;
  }

  //initialisation du formulaire de création client
  formClient(){
    this.clientForm = this.fb.group({
      completeName: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[2,6][0-9]{8}'), Validators.minLength(9), Validators.maxLength(9) ]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      gulfcamAccountNumber: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
      rccm: ['', [Validators.required, Validators.minLength(2)]],
      typeClient: ['', [Validators.required]],
    });
  }

  //initialisation de création du formulaire de commande
  formOrder(){
    this.orderForm = this.fb.group({
      client: ['', [Validators.required, Validators.minLength(3)]],
      store: ['', [Validators.required, ]],
      chanel: ['', [Validators.required, ]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
      voucherType: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getClients()
    this.getTypeVoucher()
    this.getStores()
    this.getOrders()
  }

  getClients(): void{
    this.clientService.getAllClients().subscribe(
      resp => {
        this.clients = resp.content;
      }
    )
  }

  getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.stores = resp.content
      },
      error => {
        this.notifsService.onError(error.error.message, 'échec chargement magasins')
      }
    )
  }

  getTypeVoucher(): void{
    this.voucherService.getTypevoucher().subscribe(
      resp => {
        this.vouchers = resp.content
      }
    )
  }

  addProduct(){
    this.tabProd = new Product();

    this.tabProd.quantity = this.orF['quantity'].value;
    this.tabProd.voucher = this.orF['voucherType'].value;
    this.tabProd.total = this.orF['quantity'].value * this.orF['voucherType'].value;
    this.tabProducts.push(this.tabProd)
    this.orF['quantity'].clear; this.orF['voucherType'].clear
    console.log('produit', this.tabProducts)
    this.totalOrder = 0;
    for(let prod of this.tabProducts){
      this.totalOrder = this.totalOrder + prod.total
    }
    this.orF['quantity'].reset();
    this.orF['voucherType'].reset();

  }

  removeProduct(index: Product){
    this.tabProd = new Product()

    console.log(this.tabProducts.indexOf(index))
    const prodIndex = this.tabProducts.indexOf(index)
    this.tabProducts.splice(prodIndex, 1)
    console.log('prod', index)
    console.log('produit', this.tabProducts)
    this.totalOrder = 0;
    for(let prod of this.tabProducts){
      this.totalOrder = this.totalOrder + prod.total
    }

  }

  showClientForms(){
    this.showClientForm = !this.showClientForm;
    this.showClientForm ? this.title = 'Enregistrer nouveau client' : this.title = 'Enregistrer nouvelle commande';
  }


  saveClientt(){
    this.clientService.createClients(this.clientForm.value as IClient).subscribe(
      resp => {
        this.clients.push(resp)
        this.notifsService.onSuccess('client rajouté avec succès')
        this.showClientForms();
        this.formClient()
      },
      err => {
        this.notifsService.onError(err.error.message, 'échec d\'enregistrement')
      }
    )
  }

  getOrders(){
    this.isLoading.next(true);
    this.orderService.getOrders().subscribe(
      resp =>{
        this.orders = resp.content
        this.isLoading.next(false);
      },
      err => {
        this.isLoading.next(false);
        this.notifsService.onError(err.error.message, 'échec chargement liste des commandes')
      }
    )
  }

  annuler() {
    this.formOrder();
    this.modalService.dismissAll()
  }

  saveOrder(){
    this.isLoading.next(true);
    //on récupère les informations du client
    this.client = this.clients.find(client => client.completeName === this.orF['client'].value)
    //on récupère les informations du magasin
    this.store = this.stores.find(store => store.localization === this.orF['store'].value)

    this.order.idStore = this.store.internalReference
    this.order.idClient = this.client.internalReference
    this.order.channel = this.orF['chanel'].value
    this.order.idManagerOrder = parseInt(localStorage.getItem('uid'))
    this.order.ttcaggregateAmount = this.totalOrder;

    //on enregistre la commande
    this.orderService.saveOrder(this.order).subscribe(
      resp => {
        console.log(resp)
        this.orders.push(resp)

        //une fois la commande enregistrée, on enregistre les produits liés à cette commande
        for(let prod of this.tabProducts){
          this.voucher = this.vouchers.find(v => v.amount == prod.voucher)
          this.Product.quantityNotebook = prod.quantity
          this.Product.idTypeVoucher = this.voucher.internalReference
          this.Product.idOrder = resp.internalReference

          this.productService.saveProduct(this.Product).subscribe(
            respProd => {
              console.log('prod save', respProd)
              this.isLoading.next(false);
            },
            err => {
              this.notifsService.onError(err.error.message, 'err prod')
            },
            () => {
              this.annuler()
            }
          )
        }
      },
      error => {
        this.isLoading.next(false);
        this.notifsService.onError(error.error.message, 'erreur commande')
      }
    )



    //enregistrer la commande et les produits



  // this.tabProducts.forEach(pro => {
  //   this.Products
  // })


    /**
     * enregistrer la commande en récupérant l'identifiant du gestionnaire
     */



    /**
     * proforma: générer le client est une entreprise ou un particulier
     * préfacture: générer si le client est une institution
     */
  }

  openClientModal(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  openCommandModal(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titles', size: 'xl', });
  }

}
