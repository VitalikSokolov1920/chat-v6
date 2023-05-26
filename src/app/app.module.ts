import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {LoginModule} from "./login/login/login.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegistrationModule} from "./login/registration/registration.module";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {SpinnerModule} from "./spinner/spinner.module";
import {ErrorModule} from "./error/error.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    LoginModule,
    HttpClientModule,
    RegistrationModule,
    SpinnerModule,
    ErrorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
