import { Component, OnInit,Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-delete-partner',
  templateUrl: './delete-partner.component.html',
  styleUrls: ['./delete-partner.component.scss']
})
export class DeletePartnerComponent implements OnInit {

  partnerFormGroup: FormGroup;

  partner = this.localStorageService.get('partnerFormGroup');
  

  constructor(
    public dialogRef: MatDialogRef<DeletePartnerComponent>, 
    @Inject(MAT_DIALOG_DATA)
    public _snackBar: MatSnackBar,    
    private localStorageService: LocalStorageService,) { }

  ngOnInit(): void {
    console.log(this.partner)
  }
  
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeItem(){
    //const index = this.partner.indexOf();
   // this.partner.splice(index, 1);
  }
}
