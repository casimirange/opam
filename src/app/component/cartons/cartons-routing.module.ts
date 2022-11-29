import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StockCartonComponent} from "./stock-carton/stock-carton.component";
import {AddCartonComponent} from "./add-carton/add-carton.component";
import {ReceptionnerCartonComponent} from "./receptionner-carton/receptionner-carton.component";
import {TransfererCartonComponent} from "./transferer-carton/transferer-carton.component";
import {CommandLayoutComponent} from "../commande/command-layout/command-layout.component";
import {IndexCommandComponent} from "../commande/index-command/index-command.component";
import {AddCommandComponent} from "../commande/add/add-command.component";
import {EditComponent} from "../commande/edit/edit.component";
import {CartonLayoutComponent} from "./carton-layout/carton-layout.component";

const routes: Routes = [
  { path:'', component: CartonLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: StockCartonComponent},
      { path: 'add', component: AddCartonComponent},
      { path: 'reeptionner', component: ReceptionnerCartonComponent},
      { path: 'transferer/:id', component: TransfererCartonComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartonsRoutingModule { }
