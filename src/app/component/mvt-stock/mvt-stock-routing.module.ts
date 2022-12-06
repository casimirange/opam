import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MvtStockLayoutComponent} from "./mvt-stock-layout/mvt-stock-layout.component";
import {IndexMvtStockComponent} from "./index-mvt-stock/index-mvt-stock.component";
import {ApprovisionnerCarnetComponent} from "../carnets/approvisionner-carnet/approvisionner-carnet.component";
import {TransfererCartonComponent} from "../cartons/transferer-carton/transferer-carton.component";

const routes: Routes = [
  { path:'', component: MvtStockLayoutComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: 'index', component: IndexMvtStockComponent},
      { path: 'supply', component: ApprovisionnerCarnetComponent},
      { path: 'forward', component: TransfererCartonComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MvtStockRoutingModule { }
