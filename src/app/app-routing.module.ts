import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Erreur404Component} from "./component/erreur404/erreur404.component";
import {AuthGuard} from "./_helpers/auth.guard";

const routes: Routes = [
  // Dashboard
  { path: '', loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  // Dashboard
  { path: 'dashboard', loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  // Login / Register
  { path: 'auth', loadChildren: () => import('./component/auth/auth.module').then(m => m.AuthModule) },
  // Page not found
  { path: 'pageNotFound', component: Erreur404Component },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: '/pageNotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
