import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarnetsRoutingModule } from './carnets-routing.module';
import { ApprovisionnerCarnetComponent } from './approvisionner-carnet/approvisionner-carnet.component';
import { TransfererCarnetComponent } from './transferer-carnet/transferer-carnet.component';
import { IndexCarnetComponent } from './index-carnet/index-carnet.component';
import { CarnetLayoutComponent } from './carnet-layout/carnet-layout.component';
import {SharedModule} from "../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ApprovisionnerCarnetComponent,
    TransfererCarnetComponent,
    IndexCarnetComponent,
    CarnetLayoutComponent
  ],
    imports: [
        CommonModule,
        CarnetsRoutingModule,
        SharedModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ]
})
export class CarnetsModule { }
