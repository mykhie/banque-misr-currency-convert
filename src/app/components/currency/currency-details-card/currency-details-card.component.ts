import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-currency-details-card',
  templateUrl: './currency-details-card.component.html',
  styleUrls: ['./currency-details-card.component.scss']
})
export class CurrencyDetailsCardComponent {
  @Input() flexDirection: any='row';
  @Input() currencyDetails: any;
}
