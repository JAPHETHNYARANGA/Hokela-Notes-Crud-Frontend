import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { HomeComponent } from './Dashboard/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './Dashboard/update/update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UpdateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    FormsModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
