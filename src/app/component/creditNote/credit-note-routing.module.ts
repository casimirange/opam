import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexCreditNoteComponent} from "./index-credit-note/index-credit-note.component";
import {CreditNoteLayoutComponent} from "./credit-note-layout/credit-note-layout.component";

const routes: Routes = [
  { path: '', component: CreditNoteLayoutComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: 'index', component: IndexCreditNoteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditNoteRoutingModule { }
