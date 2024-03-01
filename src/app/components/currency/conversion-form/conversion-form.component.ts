import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {Validators} from "@angular/forms";
import {ConversionModel} from "@app/models/conversion-model";
import {BaseComponent} from "@app/components/base/base.component";
import {config} from "@app/constants/constants";
import {ConvertedModel} from "@app/models";
import {ErrorModel} from "@app/models/error-model";

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
  submitted = false;
  currencyList: any;
  currencyDetails: ConvertedModel | undefined;
  isConverting = false;
  @Input() showMoreLink = true;
  @Input() fromCurrency: string | undefined | null = undefined;
  @Input() loadOnFormView = false;
  @Output() readonly conversionEmitter = new EventEmitter<ConvertedModel | undefined>();
  @Output() readonly updateSelectedCurrency = new EventEmitter<string | undefined>();
  formSubmitted = false;

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

    const data: ConversionModel = {
      amount: this.conversionFormControl['amount'].value || 1,
      from: this.conversionFormControl['from'].value as string,
      to: this.conversionFormControl['to'].value as string,
    }
    this.isConverting = true;
    this.conversionEmitter.emit(undefined);
    this.formSubmitted = true;
    this.currencyService.formUpdates.next(data);
    this.currencyService.getCurrencyConversion(data).subscribe((res: ConvertedModel | ErrorModel) => {
      this.isConverting = false;
      if (typeof res === 'object' && (res as ErrorModel).code) {
        this.showError((res as ErrorModel)?.error?.info || 'We failed to convert your currency');
        return;
      }
      this.conversionEmitter.emit(res as ConvertedModel);
      this.currencyDetails = res as ConvertedModel;

    }, (error: ErrorModel) => {
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
    }, (error: ErrorModel) => {
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
    if (!this.fromCurrency) {
      return '';
    }
    return this.currencyList ? this.currencyList[this.fromCurrency] : '';
  }

  onChangeEmitCurrencyName() {
    this.fromCurrency = this.conversionFormControl['from']?.value;
    if (!this.fromCurrency) {
      this.updateSelectedCurrency.emit('');
      return;
    }
    this.updateSelectedCurrency.emit(`${this.fromCurrency} - ${this.currencyList[this.fromCurrency] ?? ''}`);
  }
}
