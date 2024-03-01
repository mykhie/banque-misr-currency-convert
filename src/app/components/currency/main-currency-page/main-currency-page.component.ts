import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "@app/components/base/base.component";
import {ConvertedModel} from "@app/models";

@Component({
  selector: 'app-main-currency-page',
  templateUrl: './main-currency-page.component.html',
  styleUrls: ['./main-currency-page.component.scss']
})
export class MainCurrencyPageComponent extends BaseComponent implements OnInit {
  currentConversionObject: ConvertedModel | undefined = undefined;
  fromCurrency: string | undefined = undefined;

  updateSelectedCurrency($event: string | undefined) {
    this.fromCurrency = $event;
  }

  updateConvertedCurrency($event: ConvertedModel | undefined) {
    this.currentConversionObject = $event;
  }

  selectedFromCurrency: string | null = null;
  selectedToCurrency: string | null = null;
  currencyName = '';

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    // subscribe to a service
    this.activatedRoute.params.subscribe(e => {
      if (e['from']) {
        this.selectedFromCurrency = this.activatedRoute.snapshot.paramMap.get('from');
        this.selectedToCurrency = this.activatedRoute.snapshot.paramMap.get('to');
        this.updateFormPatchAndSubmit();
      }
    });
  }

  updateFormPatchAndSubmit() {
    const formData = {
      from: this.selectedFromCurrency ?? 'USD',
      to: this.selectedToCurrency ?? 'EUR',
      amount: 100,
    };
    this.currencyService.updateConversionForm(formData);
  }

}
