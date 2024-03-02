import {Component} from '@angular/core';
import {ConvertedModel} from "@app/models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  arr = Array.from(Array(9).keys());
  currentConversionObject: ConvertedModel | undefined= undefined;
  fromCurrency: string | undefined = undefined;

  updateCurrentConversionObject($evt: ConvertedModel |undefined) {
    this.currentConversionObject = $evt:;
  }

  updateSelectedCurrency($event: string|undefined) {
    this.fromCurrency = $event;
  }
}
