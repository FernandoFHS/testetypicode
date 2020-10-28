import { Cnae, CnaeResponse } from '../../models/company/Cnae';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CnaeService {
  private readonly url = `${environment.baseUrlCompany}cnae`;

  constructor(private http: HttpClient) { } 

  getAllCnae() {
    return this.http.get<CnaeResponse>(this.url)
  }
  getById(id:number) {
    return this.http.get<Cnae>(`${this.url}/${id}`)
  }
  postOrPut(cnae: Cnae) {
    return this.http.post<Cnae>(this.url, cnae)
  }
  delete(id:number) {
    return this.http.get<boolean>(`${this.url}/${id}`)
  }
}
