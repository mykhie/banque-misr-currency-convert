import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoricalDataComponent} from './historical-data.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('HistoricalDataComponent', () => {
  let component: HistoricalDataComponent;
  let fixture: ComponentFixture<HistoricalDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalDataComponent],
      imports: [HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        // Provide a mock ActivatedRoute with a dummy paramMap
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ from: 'USD',to : 'EUR' }) // Mock param values if needed
            }
          }
        }
        ]
    });
    fixture = TestBed.createComponent(HistoricalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });

});
