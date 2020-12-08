import { RootObject } from './../@core/models/Company';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CompanyContent } from '../models/Company';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _refreshTable = new Subject<void>();

  private readonly API_URL = 'http://company.qa.appmobbuy.tech/';
  private datePipe = new DatePipe('pt-BR');

  constructor(private httpClient: HttpClient, 
    public _snackBar: MatSnackBar
    ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /** CRUD METHODS */
  getAllCompanies(sort: string, order: string, page: number, size: number,companyGroup: number): Observable<{ content: CompanyContent[] }> {
    const requestUrl =
      `${this.API_URL}company/companyGroup?sort=${sort},${order}&page=${page}&size=${size}&idCompanyGroup=${companyGroup}`;

    return this.httpClient.get<{ content: CompanyContent[] }>(requestUrl).pipe(
      map((data) => this._mapCompanyResponse(data)),
    );
  }

  getCompaniesByName(name: string, page: number, size: number,companyGroup: number) {
    const requestUrl =
      `${this.API_URL}company/filters?companyName=${name}&page=${page}&size=${size}&idCompanyGroup=${companyGroup}`;

    return this.httpClient.get<CompanyContent[]>(requestUrl);
  }
  getAll(): Observable<RootObject> {  
    return this.httpClient.get<RootObject>(`${this.API_URL}company/companyGroup`);
  }

  getAllCompaniesByFilter(filter: { idCompany: number, documentNumberCompany: number, companyName: string, idCompanyGroup:number }, sort: string, order: string, page: number, size: number): Observable<{ content: CompanyContent[] }> {

    let requestUrl = `${this.API_URL}company/`;

    let params = new HttpParams();

    params = params.append('sort', `${sort},${order}`);
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    if (filter.idCompany) {
      params = params.append('idCompany', filter.idCompany.toString());
    }

    if (filter.documentNumberCompany) {
      params = params.append('documentNumberCompany', filter.documentNumberCompany.toString());
    }

    if (filter.companyName) {
      params = params.append('companyName', filter.companyName.toString());
      requestUrl += '/filters';
    }

    return this.httpClient.get<{ content: CompanyContent[] }>(requestUrl, {
      params: params
    }).pipe(
      map((data) => this._mapCompanyResponse(data)),
    );
  }

  private _mapCompanyResponse(data: { content: CompanyContent[] }): { content: CompanyContent[] } {
    data.content = data.content.map((item) => {
      if (item.situation == true) {
        item.situation = 'Ativo';
      }
      else {
        item.situation = 'Inativo';
      }

      return item;
    });

    return data;
  }

  create(company): Observable<CompanyContent> {
    return this.httpClient.post<CompanyContent>(this.API_URL + 'company', company);
  }

  readById(idCompany: number,companyGroup:number): Observable<CompanyContent> {
    const url = `${this.API_URL}company/byid?&idCompanyGroup=${companyGroup}&idCompany=${idCompany}`;
    return this.httpClient.get<CompanyContent>(url);
  }

  // readById(idCompany: number): Observable<CompanyContent> {
  //   const url = `${this.API_URL}company/byid?idCompany=${idCompany}`;
  //   return this.httpClient.get<CompanyContent>(url);
  // }

  update(company): Observable<CompanyContent> {
    return this.httpClient.put<CompanyContent>(this.API_URL + 'company', company);
  }

  delete(idCompany: number): Observable<CompanyContent> {
    const url = `${this.API_URL}/${idCompany}`;
    return this.httpClient.delete<CompanyContent>(url).pipe(
      tap(() => {
        this._refreshTable.next();
      })
    );
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
