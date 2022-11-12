import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarnetsRoutingModule } from './carnets-routing.module';
import { ApprovisionnerCarnetComponent } from './approvisionner-carnet/approvisionner-carnet.component';
import { TransfererCarnetComponent } from './transferer-carnet/transferer-carnet.component';
import { IndexCarnetComponent } from './index-carnet/index-carnet.component';
import { AddCarnetComponent } from './add-carnet/add-carnet.component';


@NgModule({
  declarations: [
    ApprovisionnerCarnetComponent,
    TransfererCarnetComponent,
    IndexCarnetComponent,
    AddCarnetComponent
  ],
  imports: [
    CommonModule,
    CarnetsRoutingModule
  ]
})
export class CarnetsModule { }
