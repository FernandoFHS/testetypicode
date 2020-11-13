import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerGuard implements CanActivateChild {

  constructor(
    private _router: Router,
    private _storageService: StorageService
  ) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = this._storageService.getItem('logged');

    if (logged) {
      return true;
    }
    else {
      this._router.navigate(['login']);
      return false;
    }
  }

}
