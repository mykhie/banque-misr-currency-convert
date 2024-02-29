import { Component } from '@angular/core';
import {BaseComponent} from "@app/components/base/base.component";

@Component({
  selector: 'app-main-currency-page',
  templateUrl: './main-currency-page.component.html',
  styleUrls: ['./main-currency-page.component.scss']
})
export class MainCurrencyPageComponent extends BaseComponent{
  currentConversionObject: any = undefined;
  fromCurrency: string | undefined = undefined;

  updateCurrentConversionObject($evt: any) {
    this.currentConversionObject = $evt;
  }

  updateSelectedCurrency($event: any) {
    this.fromCurrency = $event;
  }
}
