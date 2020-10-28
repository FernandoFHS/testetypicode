import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.scss']
})
export class EditPhoneComponent implements OnInit {

  phoneFormGroup: FormGroup;
  phoneNumber: any = this.localStorageService.get('phoneNumber');

  constructor(public dialogRef: MatDialogRef<EditPhoneComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private localStorageService: LocalStorageService,
    private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.phoneFormGroup = this._formBuilder.group({    
      contactName: ['', Validators.required],
      companyPhone: ['', Validators.required],
    })  
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
    ]);

    getErrorMessage() {
      return this.formControl.hasError('required')
        ? 'Campo Obrigatório'
        : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
      }

  editPhone() {
    let index = this.data;

    let editableItem = {
      contactName: this.phoneFormGroup.get('contactName').value,
      companyPhone: this.phoneFormGroup.get('companyPhone').value,
    }

    if (index > -1) {
      Object.assign(this.phoneNumber[index], editableItem);
      localStorage.setItem('phoneNumber', JSON.stringify(this.phoneNumber));
    } else {
      console.log(editableItem);
    }
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
