import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.scss']
})

export class AddBankAccountComponent implements OnInit {

  accountFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    public dataService: DataService, 
    public httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private localStorageService: LocalStorageService) { }

    ngOnInit(): void {

      
      this.accountFormGroup = this._formBuilder.group({
        bank: ['', Validators.required],
        agency: ['', Validators.required],
        agencyDigit: ['', Validators.required],
        account: ['', Validators.required],
        digit: ['', Validators.required],
        accountDigit: ['', Validators.required]
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


/*  createBankAccount(): void {
    this.dataService.create(this.profile).subscribe(() => {
      this.dataService.openSnackBar('Perfil adicionado com sucesso!', 'X')
      this.dialogRef.close();
    })
  }*/
  

  saveAccount(form){
    
    let bankAccountArray = this.localStorageService.get('bankAccount');
    if(!bankAccountArray){
      bankAccountArray= [];
    }
    bankAccountArray.push(form.value);

    this.localStorageService.set('bankAccount', bankAccountArray);

    this.dialogRef.close();
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

}
