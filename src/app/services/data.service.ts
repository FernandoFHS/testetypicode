import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Profile, Content } from '../models/Profile';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly API_URL ='http://register-profile.qa.appmobbuy.tech:8080/profiles';

  constructor(private httpClient: HttpClient, public _snackBar: MatSnackBar) {}

  private _refreshTable = new Subject<void>();

  refreshTable() {
    return this._refreshTable;
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  headers = new HttpHeaders({
    Authorization: 'Basic YWRtaW46MTIzNDU2',
    Token: 'e81770b51561ca52a4342c2b654336f174873aac',
    accept: 'application/json',
  });
  httpOptions = {
    headers: this.headers,
  };

  /** CRUD METHODS */

  getAllItems<TResponse>(sort: string, order: string, page: number, size: number, loadFunc: any): Observable<TResponse> {
    return loadFunc(sort, order, page, size);   
  }

  getAllProfiles(sort: string, order: string, page: number, size: number): Observable<Profile[]> {
    const requestUrl =
        `${this.API_URL}?sort=${sort},${order}&page=${page}&size=${size}`;

    return this.httpClient.get<Profile[]>(requestUrl);
  }

  create(profile: Content): Observable<Content> {
    return this.httpClient.post<Content>(this.API_URL, profile).pipe(
      tap(() => {
        this._refreshTable.next();
      })
    );
  }

  readById(idProfile: number): Observable<Content> {
    const url = `${this.API_URL}/${idProfile}`;
    return this.httpClient.get<Content>(url);
  }

  update(profile: Content): Observable<Content> {
    const url = `${this.API_URL}/${profile.idProfile}`;
    return this.httpClient.put<Content>(url, profile).pipe(
      tap(() => {
        this._refreshTable.next();
      })
    );
  }

  delete(id: number): Observable<Profile> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<Profile>(url).pipe(
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

  errorSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['mat-snack-error'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
