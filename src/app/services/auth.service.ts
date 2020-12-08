import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpCodeEnum } from '../@core/enums/http-code.enum';
import { StorageService } from '../@core/services/storage.service';
import { AuthRequestModel } from '../models/requests/auth.request.model';
import { AuthResponseModel } from '../models/responses/auth.response.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService,
    private _router: Router,
    private _notificationService: NotificationService
  ) { }

  login(request: AuthRequestModel): Promise<AuthResponseModel> {
    return new Promise<AuthResponseModel>((resolve, reject) => {
      // if (environment.api.mock) {
      //   this._storageService.setItem('logged', '1');
      //   resolve();
      // }
      // else {
      this._http.post(`${environment.bff.url_login}`, request).subscribe((data: AuthResponseModel) => {

        this._storageService.setItem('logged', '1');
        this._storageService.setItem('user', JSON.stringify(data));

        resolve(data);
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpCodeEnum.UNKNOWN) {
          reject('Erro inesperado, tente novamente mais tarde.');
        }
        else if (error.status == HttpCodeEnum.UNAUTHORIZED) {
          reject('Erro com as credenciais de login, consulte o Setor Técnico.');
        }
        else {
          reject('Credenciais inválidas.');
        }
      });
      // }
    });
  }

  logout(): void {
    this._storageService.clear();
    this._router.navigate(['login']);
  }

  getLoggedUser(): AuthResponseModel {
    try {
      const user = <AuthResponseModel>JSON.parse(this._storageService.getItem('user'));
      return user;
    }
    catch (error) {
      this._notificationService.error('Sessão inválida.');
      this.logout();
    }
  }

  getTokenApi(): string {
    try {
      const user = this.getLoggedUser();

      if (!user || !user.tokenApi) {
        throw 'Sessão inválida';
      }

      return user.tokenApi;
    }
    catch (error) {
      this._notificationService.error('Sessão inválida.');
      this.logout();
    }
  }
}
