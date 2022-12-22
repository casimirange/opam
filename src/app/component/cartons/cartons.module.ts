import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartonsRoutingModule } from './cartons-routing.module';
import { AddCartonComponent } from './add-carton/add-carton.component';
import { StockCartonComponent } from './stock-carton/stock-carton.component';
import { TransfererCartonComponent } from './transferer-carton/transferer-carton.component';
import { ReceptionnerCartonComponent } from './receptionner-carton/receptionner-carton.component';
import { CartonLayoutComponent } from './carton-layout/carton-layout.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    AddCartonComponent,
    StockCartonComponent,
    TransfererCartonComponent,
    ReceptionnerCartonComponent,
    CartonLayoutComponent
  ],
    imports: [
        CommonModule,
        CartonsRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class CartonsModule { }
