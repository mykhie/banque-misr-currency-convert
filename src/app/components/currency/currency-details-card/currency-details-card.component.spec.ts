import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDetailsCardComponent } from './currency-details-card.component';

describe('CurrencyDetailsCardComponent', () => {
  let component: CurrencyDetailsCardComponent;
  let fixture: ComponentFixture<CurrencyDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyDetailsCardComponent]
    });
    fixture = TestBed.createComponent(CurrencyDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have default value for flexDirection', () => {
    expect(component.flexDirection).toBe('row');
  });
  it('should have default value for currencyDetails', () => {
    expect(component.currencyDetails).toBeUndefined();
  });
  it('should have default value for showViewMoreBtn', () => {
    expect(component.showViewMoreBtn).toBeTrue();
  });
});
