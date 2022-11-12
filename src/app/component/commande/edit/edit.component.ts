import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../_services/order/order.service";
import {Order} from "../../../_interfaces/order";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {ActivatedRoute} from "@angular/router";
import {StoreService} from "../../../_services/store/store.service";
import {ClientService} from "../../../_services/clients/client.service";
import {IClient, TypeClient} from "../../../_interfaces/client";
import {Store} from "../../../_interfaces/store";
import {ProductService} from "../../../_services/product/product.service";
import {Products} from "../../../_interfaces/products";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {TypeVoucher} from "../../../_interfaces/typeVoucher";
import {PaiementService} from "../../../_services/paiement/paiement.service";
import {PaiementMethod} from "../../../_interfaces/paiement";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  order: Order = new Order();
  vouchers: TypeVoucher[] = []
  client: IClient = new IClient();
  store: Store = new Store();
  products: Products[] = []
  paymentMethods: PaiementMethod[] = []
  amountOrder: number
  constructor(private orderService: OrderService,  private notifsService: NotifsService, private route: ActivatedRoute,
              private clientService: ClientService, private storeService: StoreService, private productService: ProductService,
              private voucherService: VoucherService, private paymentService: PaiementService) { }

  ngOnInit(): void {
    this.getOrder()
    this.getVouchers()
    this.getPaymentMethods()
  }

  getOrder(){
    const id = this.route.snapshot.paramMap.get('id');

      this.orderService.getOrderByRef(parseInt(id)).subscribe(
        resp => {
          this.order = resp
          console.log(resp)
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
        err => {
          this.notifsService.onError(err.error.message, 'échec chargement de la commande')
        }
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
      error => {
        this.notifsService.onError(error.error.message, 'échec chargement magasins')
      }
    )
  }

}
