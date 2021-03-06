import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TransactionCsvRequestModel } from '../models/requests/transaction-csv.request.model';
import { TransactionBatchResponseModel } from '../models/responses/transaction-batch.response.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private _http: HttpClient
  ) { }

  getTransactionsBatches(page: number, size: number): Observable<TransactionBatchResponseModel> {
    try {
      if (environment.api.mock) {
        of([]); // TODO
      }
      else {
        let params = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this._http.get<TransactionBatchResponseModel>(`${environment.api.url}/monitoring-rules/transactions/batch`, {
          params: params
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

  postTransactionCSV(request: TransactionCsvRequestModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this._http.post(`${environment.api.url}/monitoring-rules/transactions/csv`, request).subscribe((data) => {
          console.log('data', data);
          resolve();
        }, (error) => {
          console.log('error', error);
          reject();
        });
      }
      catch (error) {
        console.log('Error in transaction.service.ts função postTransactionCSV');
        console.log(error);
        reject();
      }
    });
  }
}