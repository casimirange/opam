import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexCarnetComponent} from "./index-carnet/index-carnet.component";
import {ApprovisionnerCarnetComponent} from "./approvisionner-carnet/approvisionner-carnet.component";
import {TransfererCarnetComponent} from "./transferer-carnet/transferer-carnet.component";
import {CartonLayoutComponent} from "../cartons/carton-layout/carton-layout.component";
import {StockCartonComponent} from "../cartons/stock-carton/stock-carton.component";
import {AddCartonComponent} from "../cartons/add-carton/add-carton.component";
import {ReceptionnerCartonComponent} from "../cartons/receptionner-carton/receptionner-carton.component";
import {TransfererCartonComponent} from "../cartons/transferer-carton/transferer-carton.component";
import {CarnetLayoutComponent} from "./carnet-layout/carnet-layout.component";

const routes: Routes = [
  { path:'', component: CarnetLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: IndexCarnetComponent},
      { path: 'approvisionner', component: ApprovisionnerCarnetComponent},
      { path: 'transferer/:id', component: TransfererCarnetComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarnetsRoutingModule { }
