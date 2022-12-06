import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MLayoutComponent} from "../magasin/m-layout/m-layout.component";
import {DashboardMagasinComponent} from "../magasin/dashboard-magasin/dashboard-magasin.component";
import {EntrepotLayoutComponent} from "./entrepot-layout/entrepot-layout.component";
import {IndexEntrepotComponent} from "./index-entrepot/index-entrepot.component";
import {DetailsEntrepotComponent} from "./details-entrepot/details-entrepot.component";

const routes: Routes = [
  { path:'', component: EntrepotLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: IndexEntrepotComponent},
      { path: 'details/:id', component: DetailsEntrepotComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepotRoutingModule { }
