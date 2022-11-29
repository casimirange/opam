import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientLayoutComponent} from "../client/client-layout/client-layout.component";
import {IndexClientComponent} from "../client/index-client/index-client.component";
import {DetailsComponent} from "../client/details/details.component";
import {AddCommandComponent} from "../commande/add/add-command.component";
import {CouponLayoutComponent} from "./coupon-layout/coupon-layout.component";
import {IndexCouponComponent} from "./index-coupon/index-coupon.component";

const routes: Routes = [
  { path: '', component: CouponLayoutComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: 'index', component: IndexCouponComponent},
      // { path: ':id', component: DetailsComponent},
      // { path: 'aadd', component: AddCommandComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
