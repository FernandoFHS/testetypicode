import { Company } from './../models/Company';
import { AgreementContent, AgreementRequest, AgreementResponse } from './../models/Agreement';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootObject } from '../@core/models/Company';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {
  private readonly urlCompany = `${environment.baseUrlPlans}company/integration`;
  private readonly url = `${environment.baseUrlPlans}agreement`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<AgreementRequest>(this.url)
  }
  getAllPaged(sort: string, order: string, page: number, size: number, idCompanyGroup: number): Observable<{ content: AgreementContent[] }> {
    const requestUrl =
      `${this.url}/byIdCompanyGroup?idCompanyGroup=${idCompanyGroup}&sort=${sort},${order}&page=${page}&size=${size}`;
    return this.http.get<{ content: AgreementContent[] }>(requestUrl)
  }
  getCompany(idCompanyGroup: number) {
    return this.http.get<RootObject>(`${this.urlCompany}?idCompanyGroup=${idCompanyGroup}`)
  }
  getById(id:number) {
    return this.http.get<AgreementResponse>(`${this.url}/${id}`)
  }
  post(agreement: AgreementRequest) {
    return this.http.post<AgreementRequest>(`${this.url}/api`, agreement)
  }
  put(agreement: AgreementRequest) {
    return this.http.put<AgreementRequest>(`${this.url}`, agreement)
  }
  delete(id:number) {
    return this.http.get<boolean>(`${this.url}/${id}`)
  }
}
