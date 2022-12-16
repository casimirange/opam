import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestOppositionLayoutComponent} from "./request-opposition-layout/request-opposition-layout.component";
import {IndexRequestOppositionComponent} from "./index-request-opposition/index-request-opposition.component";
import {DetailsRequestOppositionComponent} from "./details-request-opposition/details-request-opposition.component";

const routes: Routes = [
  { path: '', component: RequestOppositionLayoutComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: 'index', component: IndexRequestOppositionComponent},
      { path: 'details/:id', component: DetailsRequestOppositionComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OppositionRoutingModule { }
