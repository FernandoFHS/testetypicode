import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  private _refreshTable = new Subject<void>();

  constructor() { }

  onRefreshDataTable() {
    return this._refreshTable.asObservable();
  }

  refreshDataTable() {
    this._refreshTable.next();
  }
}
