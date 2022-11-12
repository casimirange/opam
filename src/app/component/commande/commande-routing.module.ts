import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommandLayoutComponent} from "./command-layout/command-layout.component";
import {IndexCommandComponent} from "./index-command/index-command.component";
import {AddCommandComponent} from "./add/add-command.component";
import {SignupComponent} from "../auth/signup/signup.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  { path:'', component: CommandLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: IndexCommandComponent},
      { path: 'add', component: AddCommandComponent},
      { path: 'edit/:id', component: EditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
