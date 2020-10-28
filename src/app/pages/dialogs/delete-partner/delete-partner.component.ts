import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators} from '@angular/forms';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-delete-partner',
  templateUrl: './delete-partner.component.html',
  styleUrls: ['./delete-partner.component.scss']
})
export class DeletePartnerComponent implements OnInit {

  partnerSource: any = this.localStorageService.get('partnerFormGroup');

  constructor(public dialogRef: MatDialogRef<DeletePartnerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }
  
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);


  deletePartner() {
    let deleteItem = this.data;

    if (deleteItem > -1) {
      this.partnerSource.splice(deleteItem, 1);
      localStorage.setItem('partnerFormGroup', JSON.stringify(this.partnerSource));
    } else {
      console.log(deleteItem);
    }
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
