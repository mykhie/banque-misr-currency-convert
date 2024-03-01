import {Component, Injector} from '@angular/core';
import {BaseComponent} from "@app/components/base/base.component";

@Component({
  selector: 'app-main-currency-page',
  templateUrl: './main-currency-page.component.html',
  styleUrls: ['./main-currency-page.component.scss']
})
export class MainCurrencyPageComponent extends BaseComponent{
  currentConversionObject: any = undefined;
  fromCurrency: string | undefined = undefined;

  updateSelectedCurrency($event: any) {
    this.fromCurrency = $event;
  }
  updateConvertedCurrency($event: any) {
    this.currentConversionObject = $event;
  }

  selectedFromCurrency: any = undefined;
  selectedToCurrency: any = undefined;
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
      from: this.selectedFromCurrency,
      to: this.selectedToCurrency,
      amount: 100,
    };
    this.currencyService.updateConversionForm(formData);
  }

}
