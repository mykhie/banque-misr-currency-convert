import {Injectable, Injector} from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, catchError, delay, map, throwError} from "rxjs";
import {environment} from "src/environments/environment";
import {ConversionModel, ConvertedModel} from "@app/models";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends HttpService {
  formUpdates: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(injector: Injector) {
    super(injector);
  }

  formatResponseData(data: any) {
    const model: ConvertedModel = {
      fromCurrency : data?.query.from,
      toCurrency : data?.query.to,
      amount : data?.query.amount || 0,
      rate : data?.info.rate,
      result : data.result,
    }
    return model;
  }

  getCurrencyConversion(data: ConversionModel): any {
    return this.httpClient.get<any>(`${environment.apiUrl}/convert?to=${data.to}&from=${data.from}&amount=${data.amount}`)
      .pipe(delay(1000), map(res => {
        console.log(res);
        return this.formatResponseData(res);
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

  }
}
