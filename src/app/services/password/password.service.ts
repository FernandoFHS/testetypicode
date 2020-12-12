import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private readonly url = `${environment.baseUrlPassword}`;
  private readonly recoverPasswordUrl = `${environment.baseUrlRecoverPassword}`

  constructor(private http: HttpClient) { } 

  checkPassword(password) {
    return this.http.get(`${this.url}registrationPass/checkExistence`,password)
  }

  checkLoginPassword(idCompany) {
    return this.http.get(`${this.url}registrationPass/checkExistence?idCompany=${idCompany}`)
  }

  alterPassword(password, idCompany, passSale) {
    return this.http.put(`${this.url}registrationPass?idCompany=${idCompany}&localTransaction=${'P'}&passSale=${passSale}`, password)
  }
  
  createPassword(password) {
    return this.http.post(`${this.url}registrationPass`,password)
  }

  sendPasswordLinkToEmail(password) {
    return this.http.post(`${this.url}registrationPass/alterPassword`, password)
  }

  recoverPassword(password, token, idCompany) {
    return this.http.put(`${this.url}registrationPass/${token}?idCompany=${idCompany}`, password)
  }
}
