import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConversionFormComponent} from './conversion-form.component';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {ConversionModel} from "@app/models";


describe('ConversionFormComponent', () => {
  let component: ConversionFormComponent;
  let fixture: ComponentFixture<ConversionFormComponent>;
  let submitEl: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversionFormComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('button'))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Conversion button should be disabled if form is invalid', () => {
    fixture.detectChanges();

    if (component.conversionFormControl['from'].value)
      expect(submitEl.nativeElement.disabled).toBeTrue();
    else
      expect(submitEl.nativeElement.disabled).toBeFalse();
  });
  it('On valid inputs, it should be able to submit the form', () => {
    const data: ConversionModel = {
      amount: 100,
      from: 'USD',
      to: 'GBP'
    };
    component.conversionForm.patchValue(data)
    component.getConversion();
    submitEl.triggerEventHandler('click', null);
    expect(component.formSubmitted).toBeTrue();
  });

  it('To have input span labels ', () => {
    fixture.componentInstance.ngOnInit();
    const compiled = fixture.debugElement.query(By.css('span'));
    // more implementation for a mock up service to get the update title
    expect(compiled.nativeElement.textContent.length)
      .toBeGreaterThan(2);
  });
  it('Should toggle currency', () => {
    component.conversionFormControl['from'].setValue('USD');
    component.conversionFormControl['to'].setValue('GBP');
    component.toggleCurrencies();
    expect(component.conversionFormControl['from'].value).toEqual('GBP');
  })
    // more tests



});
