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

  checkLoginPassword() {
    return this.http.get(`${this.url}registrationPass/checkExistence?idCompany=${1149}`)
  }

  alterPassword(password) {
    return this.http.put(`${this.url}registrationPass?idCompany=${1149}&localTransaction=${'P'}&passSale=${123}`, password)
  }
  
  createPassword(password) {
    return this.http.post(`${this.url}registrationPass`,password)
  }

  sendPasswordLinkToEmail(password) {
    return this.http.post(`${this.url}registrationPass/alterPassword`, password)
  }

  recoverPassword(password) {
    return this.http.put(`${this.url}registrationPass/${this.recoverPasswordUrl}?idCompany=${1190}`,
    {password: password}
    )
  }
}
