import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BaseComponent } from './components/base/base.component';
import { HomeComponent } from './components/home/home.component';
import { MainCurrencyPageComponent } from './components/currency/main-currency-page/main-currency-page.component';
import { ConversionFormComponent } from './components/currency/conversion-form/conversion-form.component';
import { HistoricalDataComponent } from './components/currency/historical-data/historical-data.component';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ErrorComponent } from './components/shared/error/error.component';
import {TokenInterceptor} from "@app/interceptors";
import { CurrencyDetailsCardComponent } from './components/currency/currency-details-card/currency-details-card.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
    BaseComponent,
    HomeComponent,
    MainCurrencyPageComponent,
    ConversionFormComponent,
    HistoricalDataComponent,
    ErrorComponent,
    CurrencyDetailsCardComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
