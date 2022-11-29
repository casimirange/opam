import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SnLayoutComponent} from "./sn-layout/sn-layout.component";
import {IndexSerialNumberComponent} from "./index-serial-number/index-serial-number.component";

const routes: Routes = [
  { path:'', component: SnLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: IndexSerialNumberComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerialNumberRoutingModule { }
