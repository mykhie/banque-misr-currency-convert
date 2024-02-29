import {Injectable, Injector} from '@angular/core';
import {HttpService} from "./http.service";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
import {ConversionModel} from "../models/conversion-model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends HttpService {
  formUpdates: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(injector: Injector) {
    super(injector);
  }

  getCurrencyConversion(data: ConversionModel): any {
    return this.httpClient.get<any>(`${environment.apiUrl}/convert?to=${data.to}&from=${data.from}&amount=${data.amount}`).pipe(map(res => {
      return res;
    }))
      .pipe(
        catchError(error => {
          return throwError(() => this.handleError(error));
        })
      );
  }

  getCurrencyList(): any {
    return this.httpClient.get<any>(`${environment.apiUrl}/symbols`).pipe(map(res => {

      return res?.symbols;
    }))
      .pipe(
        catchError(error => {
          return throwError(() => this.handleError(error));
        })
      );
  }

  updateConversionForm(formData: any) {
    this.formUpdates.next(formData);
  }

  getHistoricalData(currencyFrom = 'EUR', currencyTo = 'USD') {

    let data = {
      "success": true,
      "timeseries": true,
      "start_date": "2012-05-01",
      "end_date": "2012-05-03",
      "base": currencyFrom,
      "rates": {
        "2012-01-31": {
          [currencyFrom]: 1.322891,
          [currencyTo]: 1.278047,
        },
        "2012-02-28": {
          [currencyFrom]: 1.315066,
          [currencyTo]: 1.274202,
        },
        "2012-03-31": {
          [currencyFrom]: 1.314491,
          [currencyTo]: 1.280135,
        }
      }
    };
    console.log(data);
    return data.rates;

  }
}
