import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepotRoutingModule } from './entrepot-routing.module';
import { EntrepotLayoutComponent } from './entrepot-layout/entrepot-layout.component';
import { IndexEntrepotComponent } from './index-entrepot/index-entrepot.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { DetailsEntrepotComponent } from './details-entrepot/details-entrepot.component';


@NgModule({
  declarations: [
    EntrepotLayoutComponent,
    IndexEntrepotComponent,
    DetailsEntrepotComponent
  ],
  imports: [
    CommonModule,
    EntrepotRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EntrepotModule { }
