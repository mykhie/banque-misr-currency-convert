import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCurrencyPageComponent } from './main-currency-page.component';

describe('MainCurrencyPageComponent', () => {
  let component: MainCurrencyPageComponent;
  let fixture: ComponentFixture<MainCurrencyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainCurrencyPageComponent]
    });
    fixture = TestBed.createComponent(MainCurrencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
