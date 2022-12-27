import { Component, OnInit } from '@angular/core';
import {Store} from "../../../_model/store";
import {Order} from "../../../_model/order";
import {StoreHouse} from "../../../_model/storehouse";
import {Unite} from "../../../_model/unite";
import {TypeVoucher} from "../../../_model/typeVoucher";
import {ClientService} from "../../../_services/clients/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../_services/order/order.service";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {StoreService} from "../../../_services/store/store.service";
import {StoreHouseService} from "../../../_services/storeHouse/store-house.service";
import {UnitsService} from "../../../_services/units/units.service";
import {Location} from "@angular/common";
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {StatusService} from "../../../_services/status/status.service";
import {Un} from "../../magasin/details-magasin/details-magasin.component";
import {Station} from "../../../_model/station";
import {StationService} from "../../../_services/stations/station.service";
import {CreditNote} from "../../../_model/creditNote";
import {CreditNoteService} from "../../../_services/creditNote/credit-note.service";
import {CouponService} from "../../../_services/coupons/coupon.service";
import {Coupon} from "../../../_model/coupon";

@Component({
  selector: 'app-details-station',
  templateUrl: './details-station.component.html',
  styleUrls: ['./details-station.component.css']
})
export class DetailsStationComponent implements OnInit {

  station: Station = new Station();
  roleUser = localStorage.getItem('userAccount').toString()
  creditNotes: CreditNote[] = [];
  coupons: Coupon[] = [];
  pageCredit: number = 1;
  totalPagesCredit: number;
  totalElementsCredit: number;
  pageCoupon: number = 1;
  totalPagesCoupon: number;
  totalElementsCoupon: number;
  size: number = 10;
  vouchers: TypeVoucher[] = [];
  constructor(private stationService: StationService, private activatedRoute: ActivatedRoute, private router: Router,
              private _location: Location, private voucherService: VoucherService, private statusService: StatusService,
              private creditNoteService: CreditNoteService, private couponService: CouponService) {
  }

  ngOnInit(): void {
    this.getStationInfos()
    this.getCreditNoteByStation()
    this.getCouponByStation()
    this.getTypeVoucher()
  }

  getStationInfos(){
    this.activatedRoute.params.subscribe(params => {
      this.stationService.getStationByInternalref(params['id']).subscribe(
        res => {
          this.station = res;
          console.log(res)
        }
      )
    })
  }

  //on récupère la liste des types de coupon
  getTypeVoucher(): void{
    this.voucherService.getTypevoucher().subscribe(
      resp => {
        this.vouchers = resp.content
      }
    )
  }

  back() {
    this._location.back()
  }

  getStatuts(status: string): string {
    return this.statusService.allStatus(status)
  }

  getCreditNoteByStation(){
    this.activatedRoute.params.subscribe(params => {
      this.creditNoteService.getCreditNote().subscribe(
        resp => {
          console.log('creditStation', resp)
          this.creditNotes = resp.content
          console.log('creditStation2', this.creditNotes)
          this.creditNotes = this.creditNotes.filter(creditNote => creditNote.station.internalReference == parseInt(params['id']))

        },
      )
    })
  }

  getCouponByStation(){
    this.activatedRoute.params.subscribe(params => {
      this.couponService.getCouponsByStation(parseInt(params['id']), this.pageCoupon -1, this.size).subscribe(
        resp => {
          this.coupons = resp.content
          this.totalElementsCoupon = resp.totalElements
          this.totalPagesCoupon = resp.totalPages
        },
      )
    })
  }

  padWithZero(num, targetLength) {
    return String(num).padStart(targetLength, '0');
  }
}
