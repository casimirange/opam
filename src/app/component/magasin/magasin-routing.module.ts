import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MLayoutComponent} from "./m-layout/m-layout.component";
import {DashboardMagasinComponent} from "./dashboard-magasin/dashboard-magasin.component";
import {UnitesComponent} from "./unites/unites.component";
import {DetailsMagasinComponent} from "./details-magasin/details-magasin.component";

const routes: Routes = [
  { path:'', component: MLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardMagasinComponent},
      { path: 'unites', component: UnitesComponent},
      { path: 'details/:id', component: DetailsMagasinComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagasinRoutingModule { }
