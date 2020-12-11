import { AcquirerResponse, AcquirerRequest } from '../../models/plans/Acquirer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcquirerService {
  private readonly url = `${environment.baseUrlPlans}acquirer`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<AcquirerResponse>(this.url)
  }
  getById(id:number) {
    return this.http.get<AcquirerRequest>(`${this.url}/${id}`)
  }
  postOrPut(acquirer: AcquirerRequest) {
    return this.http.post<AcquirerRequest>(this.url, acquirer)
  }
  delete(id:number) {
    return this.http.get<boolean>(`${this.url}/${id}`)
  }
}