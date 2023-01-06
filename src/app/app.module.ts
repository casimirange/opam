import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PreloaderComponent} from "./preloader/preloader.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./component/shared/shared.module";
import {Erreur404Component} from "./component/erreur404/erreur404.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TokenInterceptorProvider} from "./_helpers/token.interceptor";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    Erreur404Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    TokenInterceptorProvider,
  ],
  bootstrap: [AppComponent],
    exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
