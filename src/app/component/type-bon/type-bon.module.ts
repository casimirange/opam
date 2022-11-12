import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeBonRoutingModule} from "./type-bon-routing.module";
import {SharedModule} from "../shared/shared.module";
import {TypeBonComponent} from "./type-bon.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    TypeBonComponent
  ],
  imports: [
    CommonModule,
    TypeBonRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TypeBonModule { }
