import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'core-input-helper',
  templateUrl: './input-helper.component.html',
  styleUrls: ['./input-helper.component.scss'],
})
export class InputHelperComponent {

  data: { 
    title: string;
    messages: string[];
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) _data,
    private _dialogRef: MatDialogRef<InputHelperComponent>
  ) {
    this.data = _data;
  }

  close() {
    this._dialogRef.close();
  }

}
