import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CompanyComponent } from '../pages/company/company.component';
import { CompanyContent, Mcc} from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _refreshTable = new Subject<void>();

  private readonly API_URL = 'http://company.qa.appmobbuy.tech:8080/';

  constructor(private httpClient: HttpClient, public _snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /** CRUD METHODS */
  getAllCompanies(sort: string, order: string, page: number, size: number): Observable<CompanyContent[]> {
    const requestUrl =
        `${this.API_URL}company?sort=${sort},${order}&page=${page}&size=${size}`;
  
    return this.httpClient.get<CompanyContent[]>(requestUrl);
  }

  getCompaniesByName(name: string, page: number, size: number) {
    const requestUrl =
    `${this.API_URL}company/filters?companyName=${name}&page=${page}&size=${size}`;
    return this.httpClient.get<CompanyContent[]>(requestUrl)
  }

  getAllCompaniesByFilter(filter: {idCompany: number, documentNumberCompany: number, companyName: string}, sort: string, order: string, page: number, size: number):  Observable<CompanyContent[]> {

    let requestUrl =`${this.API_URL}company`;


    let params = new HttpParams();

    params = params.append('sort', `${sort},${order}`);
    params = params.append('page', page.toString())
    params = params.append('size', size.toString())

    if (filter.idCompany) {
      params = params.append('idCompany', filter.idCompany.toString());
    } 

    if (filter.documentNumberCompany) {
      params = params.append('documentNumberCompany', filter.documentNumberCompany.toString());
    }

    if (filter.companyName) {
      params = params.append('companyName', filter.companyName.toString());
      requestUrl += '/filters'
    }

      return this.httpClient.get<CompanyContent[]>(requestUrl, {
        params: params
      })
  }

  create(company: CompanyContent): Observable<CompanyContent> {
    return this.httpClient.post<CompanyContent>(this.API_URL + 'company', company).pipe(
      // tap(() => {
      //   this._refreshTable.next();
      // })
    );
  }

  readById(idCompany: number): Observable<CompanyContent> {
    const url = `${this.API_URL}/${idCompany}`;
    return this.httpClient.get<CompanyContent>(url);
  }

  update(company: CompanyContent): Observable<CompanyContent> {
    const url = `${this.API_URL}/${company.idCompany}`;
    return this.httpClient.put<CompanyContent>(url, company).pipe(
      tap(() => {
        this._refreshTable.next();
      })
    );;
  }

  delete(idCompany: number): Observable<CompanyContent> {
    const url = `${this.API_URL}/${idCompany}`;
    return this.httpClient.delete<CompanyContent>(url).pipe(
      tap(() => {
        this._refreshTable.next();
      })
    );;
    //this.getAllProfiles();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['mat-snack-success'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
