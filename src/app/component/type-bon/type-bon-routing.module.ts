import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeBonComponent} from "./type-bon.component";

const routes: Routes = [
  { path:'', component: TypeBonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeBonRoutingModule { }
