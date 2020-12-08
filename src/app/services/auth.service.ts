import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpCodeEnum } from '../@core/enums/http-code.enum';
import { StorageService } from '../@core/services/storage.service';
import { AuthRequestModel } from '../models/requests/auth.request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService,
    private _router: Router
  ) { }

  login(request: AuthRequestModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (environment.api.mock) {
        this._storageService.setItem('logged', '1');
        resolve();
      }
      else {
        this._http.post(`${environment.api.url}/authentication`, request).subscribe((data) => {
          console.log(data, 'data');
          resolve();
        }, (error: HttpErrorResponse) => {
          if (error.status !== HttpCodeEnum.UNKNOWN) {
            reject('Erro inesperado, tente novamente mais tarde.');
          }
          else {
            reject();
          }
        });
      }
    });
  }

  logout(): void {
    this._storageService.clear();
    this._router.navigate(['login']);
  }
}
