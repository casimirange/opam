import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationRoutingModule } from './station-routing.module';
import { StationLayoutComponent } from './station-layout/station-layout.component';
import { IndexStationComponent } from './index-station/index-station.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StationLayoutComponent,
    IndexStationComponent
  ],
    imports: [
        CommonModule,
        StationRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class StationModule { }
