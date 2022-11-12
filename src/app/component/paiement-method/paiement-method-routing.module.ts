import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MLayoutComponent} from "../magasin/m-layout/m-layout.component";
import {DashboardMagasinComponent} from "../magasin/dashboard-magasin/dashboard-magasin.component";
import {PmLayoutComponent} from "./paiementMethod/pm-layout/pm-layout.component";
import {IndexPaiementMethodComponent} from "./paiementMethod/index-paiement-method/index-paiement-method.component";

const routes: Routes = [
  { path:'', component: PmLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: IndexPaiementMethodComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaiementMethodRoutingModule { }
