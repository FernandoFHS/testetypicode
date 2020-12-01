import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-delete-phone',
  templateUrl: './delete-phone.component.html',
  styleUrls: ['./delete-phone.component.scss']
})
export class DeletePhoneComponent implements OnInit {

  phoneNumber: any = this.localStorageService.get('phoneNumber');

  constructor(public dialogRef: MatDialogRef<DeletePhoneComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  deletePhone() {
    let deleteItem = this.data;

    if (deleteItem > -1) {
      this.phoneNumber.splice(deleteItem, 1);
      localStorage.setItem('phoneNumber', JSON.stringify(this.phoneNumber));
    } else {
      console.log(deleteItem);
    }
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
