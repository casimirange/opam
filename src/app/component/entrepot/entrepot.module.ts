import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepotRoutingModule } from './entrepot-routing.module';
import { EntrepotLayoutComponent } from './entrepot-layout/entrepot-layout.component';
import { IndexEntrepotComponent } from './index-entrepot/index-entrepot.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EntrepotLayoutComponent,
    IndexEntrepotComponent
  ],
  imports: [
    CommonModule,
    EntrepotRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EntrepotModule { }
