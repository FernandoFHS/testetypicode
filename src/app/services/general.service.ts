import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../@core/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(
    private _matDialog: MatDialog
  ) { }

  openConfirmDialog(message: string, yesCallback: Function, noCallback: Function, title: string = null): void {
    const confirmDialog = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      autoFocus: false
    });

    confirmDialog.componentInstance.title = title;
    confirmDialog.componentInstance.confirmMessage = message;
    confirmDialog.componentInstance.disableClose = false;

    confirmDialog.componentInstance.cancelMessage = 'Não';
    confirmDialog.componentInstance.btnMessage = 'Sim';

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        yesCallback();
      }
      else {
        noCallback();
      }
    });
  }

  openOkDialog(message: string, okCallback: Function, title: string = null): void {
    const confirmDialog = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      autoFocus: false
    });

    confirmDialog.componentInstance.title = title;
    confirmDialog.componentInstance.confirmMessage = message;
    confirmDialog.componentInstance.disableClose = true;

    confirmDialog.componentInstance.btnMessage = 'OK';

    confirmDialog.afterClosed().subscribe(result => {
      okCallback();
    });
  }

  copyWithoutReferences<T>(objToCopy): T {
    return JSON.parse(JSON.stringify(objToCopy));
  }

  addDaysToDateNow(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setMinutes(date.getMinutes() - 1);
    return date;
  }
}