import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerialNumberRoutingModule } from './serial-number-routing.module';
import { SnLayoutComponent } from './sn-layout/sn-layout.component';
import { IndexSerialNumberComponent } from './index-serial-number/index-serial-number.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SnLayoutComponent,
    IndexSerialNumberComponent
  ],
  imports: [
    CommonModule,
    SerialNumberRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SerialNumberModule { }
