import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CompanyComponent } from '../pages/company/company.component';
import { CompanyContent, Mcc, RootObject } from '../models/Company';

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
        console.log('Oi')

    return this.httpClient.get<CompanyContent[]>(requestUrl);
  }

  create(company: CompanyContent): Observable<CompanyContent> {
    return this.httpClient.post<CompanyContent>(this.API_URL, company).pipe(
      tap(() => {
        this._refreshTable.next();
      })
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
