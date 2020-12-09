import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgreementByCompanygroupService {

  private readonly url = `${environment.baseUrlPlans}/agreement/byIdCompanyGroup`;

  constructor(private http: HttpClient) { }

  getAgreementByIdCompanyGroup(idCompanyGroup) {
    return this.http.get(`${this.url}?idCompanyGroup=${idCompanyGroup}`)
    //http://register-plans.qa.appmobbuy.tech/agreement/byIdCompanyGroup?idCompanyGroup=2
  }
}
