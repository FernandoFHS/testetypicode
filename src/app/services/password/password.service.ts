import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  // url = "http://password-maintenance.qa.appmobbuy.tech:8080/";

  private readonly url = `${environment.baseUrlPassword}`

  constructor(private http: HttpClient) { } 

  checkPassword(password){
    return this.http.get(`${this.url}registrationPass/checkExistence`,password)
  }

  checkLoginPassword(){
    return this.http.get(`${this.url}registrationPass/checkExistence?idCompany=${12}`)
  }

  alterPassword(password){
    return this.http.put(`${this.url}registrationPass`,password)
  }
  
  createPassword(password){
    return this.http.post(`${this.url}registrationPass`,password)
  }

  

}
