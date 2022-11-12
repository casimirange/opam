import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommandLayoutComponent} from "../commande/command-layout/command-layout.component";
import {IndexCommandComponent} from "../commande/index-command/index-command.component";
import {AddCommandComponent} from "../commande/add/add-command.component";
import {EditComponent} from "../commande/edit/edit.component";
import {CaisseLayoutComponent} from "./caisse-layout/caisse-layout.component";
import {IndexCaisseComponent} from "./index-caisse/index-caisse.component";

const routes: Routes = [
  { path:'', component: CaisseLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: IndexCaisseComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaisseRoutingModule { }
