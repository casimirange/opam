import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditNoteRoutingModule } from './credit-note-routing.module';
import { IndexCreditNoteComponent } from './index-credit-note/index-credit-note.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    IndexCreditNoteComponent
  ],
  imports: [
    CommonModule,
    CreditNoteRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreditNoteModule { }
