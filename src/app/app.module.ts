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
// import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {TokenInterceptorProvider} from "./_helpers/token.interceptor";
import { CopyAndPasteDirective } from './directive/copy-and-paste.directive';
import {NgOtpInputModule} from "ng-otp-input";
import {ClientService} from "./_services/clients/client.service";
import {OnlineStatusModule} from "ngx-online-status";
// import {Ng2SearchPipeModule} from "ng2-search-filter";
// import {Ng2OrderModule} from "ng2-order-pipe";

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    Erreur404Component,
    CopyAndPasteDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    NgOtpInputModule,
    // SweetAlert2Module.forRoot(),
    // Ng2SearchPipeModule,
    // Ng2OrderModule
    OnlineStatusModule
  ],
  providers: [
    TokenInterceptorProvider,
    // ClientService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
