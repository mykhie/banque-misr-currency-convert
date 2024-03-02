import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCurrencyPageComponent } from './main-currency-page.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('MainCurrencyPageComponent', () => {
  let component: MainCurrencyPageComponent;
  let fixture: ComponentFixture<MainCurrencyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainCurrencyPageComponent],
      imports: [HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(MainCurrencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
