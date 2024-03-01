import {Component, Input} from '@angular/core';
import {ConvertedModel} from "@app/models";

@Component({
  selector: 'app-currency-details-card',
  templateUrl: './currency-details-card.component.html',
  styleUrls: ['./currency-details-card.component.scss']
})
export class CurrencyDetailsCardComponent {
  @Input() flexDirection: any='row';
  @Input() currencyDetails: ConvertedModel | undefined =undefined;
  @Input() showViewMoreBtn =true;
}
