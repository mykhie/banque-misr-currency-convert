import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {config} from "../constants/constants"
import {ErrorModel} from "@app/models/error-model";
import {ConversionModel} from "@app/models";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpClient: HttpClient;
  constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }



  handleError(error: HttpErrorResponse): ErrorModel {
    const errorMsg: string = this.returnHttpErrorMessage(error);
    return {
      code: error?.status,
      message: errorMsg
    };
  }

  returnHttpErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Error: ${error.error.message}`;
    }

    if (error?.status.toString().startsWith("5")) {
      return config.SERVER_ERROR_FAILURE;
    }
    // you can include the error body
    switch (error?.status) {
      case 0: {
        return `A network related error occurred: ${error.message}`;
      }
      case 401: {
        return `${error.error?.message}`;
      }
      case 404: {
        return `Not Found: ${error.error?.message}`;
      }
      case 403: {
        return `Access Denied: ${error.error?.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.error?.message}`;
      }
      default: {
        return `  ${error.error.message}`;
      }
    }
  }

  returnQueryString(queryParams: ConversionModel) {
    let queryString = '';
    for (const key  in queryParams) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        queryString += `${key}=${queryParams[key]}&`;
      }
    }
    if (queryString.length > 0) {
      queryString = `?${queryString.slice(0, -1)}`;
    }

    return queryString;
  }
}

