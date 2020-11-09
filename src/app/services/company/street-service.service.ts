import { StreetResponse, StreetRequest } from './../../models/company/Street';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreetServiceService {

  private readonly url = `${environment.baseUrlCompany}street`;

  constructor(private http: HttpClient) { }

  getAllCnae() {
    return this.http.get<StreetResponse>(this.url)
  }
  getById(id:number) {
    return this.http.get<StreetRequest>(`${this.url}/${id}`)
  }
  postOrPut(street: StreetRequest) {
    return this.http.post<StreetRequest>(this.url, street)
  }
  delete(id:number) {
    return this.http.get<boolean>(`${this.url}/${id}`)
  }

  getByZipCodeAndStreetName(zipCode: string, name: string) {
    return this.http.get<StreetResponse>(`${this.url}/byZipCode/${zipCode}/byName/${name}`)
  }
}
