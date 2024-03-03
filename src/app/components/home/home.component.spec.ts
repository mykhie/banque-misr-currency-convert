import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.arr = new Array(9); // Set arr to have 9 elements
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have default value for arr', () => {
    expect(component.arr.length).toBe(9);
  });
  it('should render app-currency-details-card', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-currency-details-card')).toBeTruthy();
  });
  it('should render app-conversion form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-conversion-form')).toBeTruthy();
  });
  it('should render app-currency-details-card 9 times', () => {
    const compiled = fixture.nativeElement;
    component.currentConversionObject = {toCurrency: 'USD', fromCurrency: 'EUR', rate: 0.8, result: 0.8, amount: 100,};
    fixture.detectChanges();
    expect(compiled.querySelector('.grid-container').children.length).toBe(9);
  })

});
