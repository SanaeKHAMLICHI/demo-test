import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from "./auth/auth/auth-interceptor.service";
import {StoreModule} from "@ngrx/store";
import { reducer } from './reducer';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HttpClientModule,
    StoreModule.forRoot({ counter: reducer })

  ],
  providers: [
  ]
})
export class AppModule { }
