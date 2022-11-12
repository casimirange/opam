import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexCarnetComponent} from "./index-carnet/index-carnet.component";
import {AddCarnetComponent} from "./add-carnet/add-carnet.component";
import {ApprovisionnerCarnetComponent} from "./approvisionner-carnet/approvisionner-carnet.component";
import {TransfererCarnetComponent} from "./transferer-carnet/transferer-carnet.component";

const routes: Routes = [
  { path: '', component: IndexCarnetComponent},
  { path: 'add', component: AddCarnetComponent},
  { path: 'approvisionner', component: ApprovisionnerCarnetComponent},
  { path: 'transferer/:id', component: TransfererCarnetComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarnetsRoutingModule { }
