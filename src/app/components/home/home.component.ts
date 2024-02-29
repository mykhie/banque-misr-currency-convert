import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  arr = Array.from(Array(9).keys());
  currentConversionObject: any = undefined;
  fromCurrency: string | undefined = undefined;

  updateCurrentConversionObject($evt: any) {
    this.currentConversionObject = $evt;
  }

  updateSelectedCurrency($event: any) {
    this.fromCurrency = $event;
  }
}
