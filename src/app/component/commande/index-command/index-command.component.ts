import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Client} from "../../../_interfaces/client";


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
import {StatusService} from "../../../_services/status/status.service";
import {StatusOrderService} from "../../../_services/status/status-order.service";

export class Product{
  quantity: number;
  voucher: number;
  total?: number
}
@Component({
  selector: 'app-index-command',
  templateUrl: './index-command.component.html',
  styleUrls: ['./index-command.component.scss']
})
export class IndexCommandComponent implements OnInit {

  title = 'Enregistrer nouvelle commande';
  clients: Client[] = [];
  client: Client;
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
  page: number = 1;
  totalPages: number;
  totalElements: number;
  size: number = 10;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  roleUser = localStorage.getItem('userAccount').toString()
  constructor(private fb: FormBuilder, private modalService: NgbModal, private clientService: ClientService,
              private voucherService: VoucherService, private notifsService: NotifsService, private storeService: StoreService,
              private productService: ProductService, private orderService: OrderService, private statusService: StatusOrderService) {
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
      delais: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      refCli: ['', [Validators.required, Validators.minLength(3)]],
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

  findClients(event: any): void{
    console.log(event)
    this.clientService.searchClient(event) .subscribe(
      resp => {
        this.clients = resp;
        console.log(resp)
      }, error => {
        this.clients = []
      }
    )
  }

  getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.stores = resp.content
      },
      error => {
        // this.notifsService.onError(error.error.message, 'échec chargement magasins')
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
    this.tabProd.total = this.orF['quantity'].value * this.orF['voucherType'].value * 10;
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
    this.showClientForm = true;
    this.title = 'Enregistrer nouveau client';
  }

  showOrderForms(){
    this.showClientForm = false;
    this.title = 'Enregistrer nouvelle commande';
  }


  saveClientt(){
    this.clientService.addClient(this.clientForm.value as Client).subscribe(
      resp => {
        this.clients.push(resp)
        this.notifsService.onSuccess('client rajouté avec succès')
        this.showOrderForms();
        this.annulerCommande()
      },
      err => {
        // this.notifsService.onError(err.error.message, 'échec d\'enregistrement')
      }
    )
  }

  getOrders(){
    this.isLoading.next(true);
    this.orderService.getOrders().subscribe(
      resp =>{
        this.orders = resp.content
        this.isLoading.next(false);
        this.notifsService.onSuccess('Cahrgement des commandes')
      },
    )
  }

  getOrdersPaginate(){
    this.isLoading.next(true);
    this.orderService.getOrdersWithPagination(this.page-1, this.size).subscribe(
      resp =>{
        this.orders = resp.content
        this.isLoading.next(false);
      },
    )
  }

  annuler() {
    this.formOrder();
    this.formClient();
    this.showOrderForms();
    this.modalService.dismissAll()
  }

  annulerCommande() {
    this.formClient();
    this.showOrderForms();
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
    this.order.description = this.orF['description'].value
    this.order.deliveryTime = this.orF['delais'].value
    this.order.clientReference = this.orF['refCli'].value
    this.order.idManagerOrder = parseInt(localStorage.getItem('uid'))
    this.order.tax = 0.1925;
    this.order.ttcaggregateAmount = this.totalOrder * this.order.tax + this.totalOrder;
    this.order.netAggregateAmount = this.totalOrder;


    //on enregistre une nouvelle commande
    this.orderService.saveOrder(this.order).subscribe(
      resp => {
        console.log(resp)
        this.isLoading.next(false);
        /**
         * je dois gérer cette partie
         */
        // this.orders.push(resp)

        this.saveProductsOrder(resp)
        setTimeout(() => this.getProforma(resp) , 5000);

        this.getOrders()
        this.notifsService.onSuccess('Nouvelle commande créée')
        this.tabProducts = []
      },
      error => {
        this.isLoading.next(false);
        // this.notifsService.onError(error.error.message, 'erreur commande')
      }
    )

  }

  saveProductsOrder(order: Order){
    //une fois la commande enregistrée, on enregistre les produits liés à cette commande
    for(let prod of this.tabProducts){
      this.voucher = this.vouchers.find(v => v.amount == prod.voucher)
      this.Product.quantityNotebook = prod.quantity
      this.Product.idTypeVoucher = this.voucher.internalReference
      this.Product.idOrder = order.internalReference

      this.productService.saveProduct(this.Product).subscribe(
        respProd => {
          console.log('prod save', respProd)
          this.isLoading.next(false);
        },
        err => {
          // this.notifsService.onError(err.error.message, 'err prod')
        },
        () => {
          this.annuler()
        }
      )
    }
  }

  getProforma(order: Order){
    this.orderService.getProforma(order.internalReference).subscribe(
      respProd => {
        const file = new Blob([respProd], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, 'Download');
        // this.isLoading.next(false);
      },
    )
  }

  openClientModal(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  openCommandModal(content: any){
    const modal = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titles', size: 'xl', });
  }

  pageChange(event: number){
    this.page = event
    this.getOrdersPaginate()
  }

  getStatuts(status: string): string {
    return this.statusService.allStatus(status)
  }
}
