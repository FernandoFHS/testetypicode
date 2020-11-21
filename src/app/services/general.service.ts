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
      disableClose: true
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
      disableClose: true
    });

    confirmDialog.componentInstance.title = title;
    confirmDialog.componentInstance.confirmMessage = message;
    confirmDialog.componentInstance.disableClose = true;

    confirmDialog.componentInstance.btnMessage = 'OK';

    confirmDialog.afterClosed().subscribe(result => {
      okCallback();
    });
  }
}