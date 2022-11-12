import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartonsRoutingModule } from './cartons-routing.module';
import { AddCartonComponent } from './add-carton/add-carton.component';
import { StockCartonComponent } from './stock-carton/stock-carton.component';
import { TransfererCartonComponent } from './transferer-carton/transferer-carton.component';
import { ReceptionnerCartonComponent } from './receptionner-carton/receptionner-carton.component';


@NgModule({
  declarations: [
    AddCartonComponent,
    StockCartonComponent,
    TransfererCartonComponent,
    ReceptionnerCartonComponent
  ],
  imports: [
    CommonModule,
    CartonsRoutingModule
  ]
})
export class CartonsModule { }
