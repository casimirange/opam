import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationRoutingModule } from './station-routing.module';
import { StationLayoutComponent } from './station-layout/station-layout.component';
import { IndexStationComponent } from './index-station/index-station.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { DetailsStationComponent } from './details-station/details-station.component';


@NgModule({
  declarations: [
    StationLayoutComponent,
    IndexStationComponent,
    DetailsStationComponent
  ],
    imports: [
        CommonModule,
        StationRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class StationModule { }
