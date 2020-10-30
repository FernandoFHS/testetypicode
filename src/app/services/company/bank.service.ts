import { Bank, BankResponse } from '../../models/company/Bank';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private readonly url = `${environment.baseUrlCompany}bank`;

  constructor(private http: HttpClient) {  }

  getAllCnae() {
    return this.http.get<BankResponse>(this.url)
  }
  getById(id:number) {
    return this.http.get<Bank>(`${this.url}/${id}`)
  }
  postOrPut(bank: Bank) {
    return this.http.post<Bank>(this.url, bank)
  }
  delete(id:number) {
    return this.http.get<boolean>(`${this.url}/${id}`)
  }
}
