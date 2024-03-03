import {Injectable, Injector} from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, catchError, delay, map, Observable, throwError} from "rxjs";
import {environment} from "src/environments/environment";
import {ConversionModel, ConversionResponse, ConvertedModel} from "@app/models";
import {HttpParams} from "@angular/common/http";
import {ErrorModel} from "@app/models/error-model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends HttpService {
  formUpdates: BehaviorSubject<ConversionModel | undefined> = new BehaviorSubject<ConversionModel | undefined>(undefined);

  constructor(injector: Injector) {
    super(injector);
  }

  formatResponseData(data:ConversionResponse | null | undefined) {
    const model: ConvertedModel = {
      fromCurrency: data?.query.from,
      toCurrency: data?.query.to,
      amount: data?.query.amount ?? 0,
      rate: data?.info.rate ?? 0,
      result: data?.result ?? 0,
    }
    return model;
  }


  getCurrencyConversion(data: ConversionModel): Observable<ConvertedModel | ErrorModel> {
    return this.httpClient.get<ConversionResponse>(`${environment.apiUrl}/convert?from=${data.from}&to=${data.to}&amount=${data.amount}`)
      //TODO: endpoint is failing due to subscription, mocking  request with an interceptor
      .pipe(delay(1000), map(res => {
        return this.formatResponseData(res);
      }))
      .pipe(
        catchError(error => {
          return throwError(() => this.handleError(error));
        })
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrencyList(): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.httpClient.get<any>(`${environment.apiUrl}/symbols`).pipe(map(res => {
      return res?.symbols;
    }))
      .pipe(
        catchError(error => {
          return throwError(() => this.handleError(error));
        })
      );
  }

  updateConversionForm(formData: ConversionModel) {
    this.formUpdates.next(formData);
  }

  getHistoricalData(params: ConversionModel) {
    const url = environment.apiUrl+'timeseries'+this.returnQueryString(params);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.httpClient.get<any>(url).pipe(map(res => {
      return res;
    }))
      .pipe(
        catchError(error => {
          return throwError(() => this.handleError(error));
        })
      );

  }

  //TODO :: move to a utility service
  //TODO :: this method is not working as expected and needs to be fixed/investigated
  returnQueryParamString(queryParams: ConversionModel) {
    let params = new HttpParams();
    for (const key  in queryParams) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        params = params.set(key, queryParams[key] as keyof ConversionModel);
      }
    }
    return params;
  }

}
