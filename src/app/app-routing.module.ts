import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/shared/page-not-found/page-not-found.component";
import {MainCurrencyPageComponent} from "./components/currency/main-currency-page/main-currency-page.component";


const routes: Routes = [


  {
    path: '', component: HomeComponent
  },
  {
    path: 'currency-details/:from/:to', component: MainCurrencyPageComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
