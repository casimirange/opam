import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreLayoutComponent } from './store-layout/store-layout.component';
import { IndexStoreComponent } from './index-store/index-store.component';


@NgModule({
  declarations: [
    StoreLayoutComponent,
    IndexStoreComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
