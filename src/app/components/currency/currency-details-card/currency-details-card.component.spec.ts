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
});
