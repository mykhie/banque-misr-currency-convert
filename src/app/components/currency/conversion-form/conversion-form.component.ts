import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {Validators} from "@angular/forms";
import {ConversionModel} from "@app/models/conversion-model";
import {BaseComponent} from "@app/components/base/base.component";
import {config} from "@app/constants/constants";

@Component({
  selector: 'app-conversion-form',
  templateUrl: './conversion-form.component.html',
  styleUrls: ['./conversion-form.component.scss']
})
export class ConversionFormComponent extends BaseComponent implements OnInit {

  public conversionForm = this.formGroupBuilder.group(
    {
      amount: [1, [Validators.required, Validators.pattern(config.DECIMAL_REGEX)]],
      to: ['', [Validators.required]],
      from: ['', [Validators.required]]
    }
  )
  submitted: boolean = false;
  currencyList: any;
  currencyDetails: any;
  isConverting: boolean = false;
  @Input() showMoreLink = true;
  @Input() fromCurrency: any = undefined;
  @Output() readonly conversionEmitter = new EventEmitter<any>();
  @Output() readonly updateSelectedCurrency = new EventEmitter<any>();
  formSubmitted: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.getCurrencyList();
    this.conversionForm.reset();
    this.currencyService.formUpdates.subscribe((res: any) => {
      this.conversionForm.patchValue(res);
      if (!this.showMoreLink) {
        this.getConversion();
      }
    })
  }

  getConversion() {
    this.submitted = true;
    this.errorMessage = undefined;
    if (this.conversionForm.invalid) {
      return;
    }

    let data: ConversionModel = {
      amount: this.conversionFormControl['amount']!.value || 1,
      from: this.conversionFormControl['from'].value as string,
      to: this.conversionFormControl['to']!.value as string,
    }
    this.isConverting = true;
    this.conversionEmitter.emit(undefined);
    this.formSubmitted = true;
    this.currencyService.getCurrencyConversion(data).subscribe((res: any) => {
      this.isConverting = false;
      if (res?.error) {
        this.showError(res?.error?.info || 'We failed to convert your currency');
        return;
      }
      this.conversionEmitter.emit(res);
      this.currencyDetails = res;
    }, (error: any) => {
      this.showError(error?.message);
      this.isConverting = false;
    });
  }

  get conversionFormControl() {
    return this.conversionForm.controls;
  }

  getCurrencyList() {
    this.isLoadingTrue();
    this.currencyService.getCurrencyList().subscribe((res: any) => {
      this.isLoadingFalse();
      this.currencyList = res;
    }, (error: any) => {
      this.showError(error?.message);
      this.isLoadingFalse();
    });
  }

  toggleCurrencies() {
    if (this.conversionFormControl['from'].invalid || this.conversionFormControl['to'].invalid) {
      this.showError('Please select both From and To currency');
    }

    let a, b = undefined;
    [a, b] = [this.conversionFormControl['from'].value, this.conversionFormControl['to'].value];
    [a, b] = [b, a];
    this.conversionFormControl['from'].setValue(a);
    this.conversionFormControl['to'].setValue(b);
    // update title if you are on more details
    if (!this.showMoreLink) {
      this.fromCurrency = a;
    }
    this.getConversion();
  }

  get getCurrencyKeys() {
    return this.currencyList ? Object.keys(this.currencyList) : [];
  }

  get returnCurrencyName() {
    return this.currencyList ? this.currencyList[this.fromCurrency] : '';
  }

  onChangeEmitCurrencyName() {
    this.fromCurrency = this.conversionFormControl['from']?.value;
    this.updateSelectedCurrency.emit( `${this.fromCurrency} - ${this.currencyList[this.fromCurrency] ?? ''}`);
  }
}
