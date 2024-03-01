import {Injectable, Injector} from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, catchError, delay, map, throwError} from "rxjs";
import {environment} from "src/environments/environment";
import {ConversionModel, ConvertedModel} from "@app/models";
import {HttpParams} from "@angular/common/http";

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
    return this.httpClient.get<any>(`${environment.apiUrl}/convert?from=${data.from}&to=${data.to}&amount=${data.amount}`)
      //TODO: endpoint is failing due to subscription request with an interceptor
      .pipe(delay(1000), map(res => {
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

  getHistoricalData(params: ConversionModel) {
    const queryParams = this.returnQueryParamString(params);
    return this.httpClient.get<any>(`${environment.apiUrl}/timeseries`,{params:queryParams}).pipe(map(res => {
      return res;
    }))
      .pipe(
        catchError(error => {
          return throwError(() => this.handleError(error));
        })
      );

  }
  returnQueryParamString(queryParams:ConversionModel){
    let params = new HttpParams();
    for (let key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        // @ts-ignore
        params = params.set(key, queryParams[key]);
      }
    }
    return params;
  }
}
