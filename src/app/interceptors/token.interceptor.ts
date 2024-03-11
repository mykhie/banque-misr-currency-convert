import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let newParams = new HttpParams({fromString: request.params.toString()});
    newParams = newParams.append('apikey', environment.apiKey);

    const requestClone = request.clone({
      params: newParams
    });
    return next.handle(requestClone);
  }

}
