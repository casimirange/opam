import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagasinRoutingModule } from './magasin-routing.module';
import { MLayoutComponent } from './m-layout/m-layout.component';
import {SharedModule} from "../shared/shared.module";
import { DashboardMagasinComponent } from './dashboard-magasin/dashboard-magasin.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MLayoutComponent,
    DashboardMagasinComponent
  ],
  imports: [
    CommonModule,
    MagasinRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MagasinModule { }
