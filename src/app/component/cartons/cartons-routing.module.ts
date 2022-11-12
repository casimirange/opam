import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StockCartonComponent} from "./stock-carton/stock-carton.component";
import {AddCartonComponent} from "./add-carton/add-carton.component";
import {ReceptionnerCartonComponent} from "./receptionner-carton/receptionner-carton.component";
import {TransfererCartonComponent} from "./transferer-carton/transferer-carton.component";

const routes: Routes = [
  { path: '', component: StockCartonComponent},
  { path: 'add', component: AddCartonComponent},
  { path: 'reeptionner', component: ReceptionnerCartonComponent},
  { path: 'transferer/:id', component: TransfererCartonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartonsRoutingModule { }
