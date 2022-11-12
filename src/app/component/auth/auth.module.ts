import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OtpComponent } from './otp/otp.component';
import {NgOtpInputModule} from "ng-otp-input";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    FormsModule
  ]
})
export class AuthModule { }
