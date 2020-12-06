import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyByLevelService {

  private readonly url = `${environment.baseUrlCompany}company/companyByLevel`;

  constructor(private http: HttpClient) {  }

  getByLevel() {
    return this.http.get(this.url+"?idCompanyGroup=1008&level=70")
  }

}
