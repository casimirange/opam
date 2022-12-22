import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StationLayoutComponent} from "./station-layout/station-layout.component";
import {IndexStationComponent} from "./index-station/index-station.component";
import {DetailsStationComponent} from "./details-station/details-station.component";

const routes: Routes = [
  { path:'', component: StationLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: IndexStationComponent},
      { path: 'details/:id', component: DetailsStationComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationRoutingModule { }
