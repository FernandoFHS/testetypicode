import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetExtractFilterModel } from '../models/filters/get-extract.filter.model';
import { BalanceResponseModel } from '../models/responses/balance.response.model';
import { ExtractResponseModel } from '../models/responses/extract.response.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentAccountService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  getBalanceByIdCompany(idCompany: number): Observable<BalanceResponseModel> {
    try {
      if (environment.bff.mock) {
        return of(BalanceResponseModel.mock(idCompany));
      }
      else {
        // let headers = new HttpHeaders();
        // headers = headers.append('token', this._authService.getTokenApi());

        let params = new HttpParams();
        params = params.append('idCompany', idCompany.toString());

        return this._http.get<BalanceResponseModel>(`${environment.bff.url_financial}/accounts`, {
          params: params,
          // headers: headers
        });
      }
    }
    catch (error) {
      console.log(error);
      of({});
    }
  }

  getExtractByFilter(filter: GetExtractFilterModel, page: number, size: number): Observable<ExtractResponseModel> {
    try {
      if (environment.bff.mock) {
        return of(ExtractResponseModel.mock());
      }
      else {
        // let headers = new HttpHeaders();
        // headers = headers.append('token', this._authService.getTokenApi());

        let params = new HttpParams();

        // TODO
        params = params.append('dateTransactionStart', this.formatDateToAPI(filter.dateTransactionStart, true));
        params = params.append('dateTransactionFinish', this.formatDateToAPI(filter.dateTransactionFinish, false));
        params = params.append('idCompany', filter.idCompany);

        // TODO
        // params = params.append('pageNumber', page.toString());
        // params = params.append('pageSize', size.toString());
        params = params.append('paged', `${false}`); // TODO

        return this._http.get<ExtractResponseModel>(`${environment.bff.url_financial}/transaction`, {
          params: params,
          // headers: headers
        }).pipe(
          map((data) => {
            // TODO

            return data;
          })
        );
      }
    }
    catch (error) {
      console.log(error);
      of([]);
    }

  }

  private formatDateToAPI(date: Date, start: boolean): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate();

    let response = `${year}-${month}-${day}`;

    if (start) {
      response = `${response}T00:00:00`
    }
    else {
      response = `${response}T23:59:59`;
    }

    return response;
  }

}