import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable()
export class FakerInterceptor implements HttpInterceptor {

  private returnCurrency(fromCurrency: string, toCurrency: string) {
    return {
      success: true,
      query: {
        from: fromCurrency,
        to: toCurrency,
        amount: 25
      },
      info: {
        timestamp: 1519328414,
        rate: 148.972231
      },
      historical: "",
      date: "2018-02-22",
      result: 3724.305775
    }
  }

  historicalData(currencyFrom: string, currencyTo: string) {
    return {
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
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('convert') || request.url.includes('timeseries')) {
      const searchParams = this.returnQueryParams(request.url);
      const fromCurrency = searchParams?.from ?? 'USD';
      const toCurrency = searchParams?.to ?? 'EUR';
      if (request.method === "GET" && request.url.includes('convert')) {
        return of(new HttpResponse({status: 200, body: this.returnCurrency(fromCurrency, toCurrency)}));
      }
      if (request.method === "GET" && request.url.includes('timeseries')) {
        return of(new HttpResponse({status: 200, body: this.historicalData(fromCurrency, toCurrency)}));
      }
    }
    return next.handle(request)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  returnQueryParams(url: string): any {
    const searchParams = url.split('?')[1];
    const obj = {};
    searchParams.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      obj[key] = value;
    });
    return obj;
  }
}
