import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MvtStockRoutingModule } from './mvt-stock-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {IndexMvtStockComponent} from "./index-mvt-stock/index-mvt-stock.component";
import {MvtStockLayoutComponent} from "./mvt-stock-layout/mvt-stock-layout.component";


@NgModule({
  declarations: [
    IndexMvtStockComponent,
    MvtStockLayoutComponent,
  ],
  imports: [
    CommonModule,
    MvtStockRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MvtStockModule { }
