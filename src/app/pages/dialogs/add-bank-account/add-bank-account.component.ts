import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/Profile';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.scss']
})
export class AddBankAccountComponent implements OnInit {

  accountFormGroup: any;

  constructor(public dialogRef: MatDialogRef<AddBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    public dataService: DataService, 
    public httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private localStorageService: LocalStorageService) { }

    ngOnInit(): void {

      /*
      this.accountFormGroup = this._formBuilder.array([
        bank: ['', Validators.required],
        agency: ['', Validators.required],
        agencyDigit: ['', Validators.required],
        account: ['', Validators.required],
        digit: ['', Validators.required],
        accountDigit: ['', Validators.required]
      ]);*/

      this.accountFormGroup = new FormGroup({

        accountsBank: new FormArray([
          this._formBuilder.group({
            bank: [''],
            agency: [''],
            agencyDigit: [''],
          })
        ]),

      });

      
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

  public loadData() {
    //this.exampleDatabase = new DataService(this.httpClient);

    this.dataService.getAllProfiles().then((data) => {

      this.dataSource = data;
      
    }, (error) => {
      // TODO
    });
  
  }

/*  createBankAccount(): void {
    this.dataService.create(this.profile).subscribe(() => {
      this.dataService.openSnackBar('Perfil adicionado com sucesso!', 'X')
      this.dialogRef.close();
    })
  }*/
  
  onNoClick(): void {
    this.dialogRef.close();
    this.loadData();
  }

  saveAccount(form){
    let i = 0;
    for(i; i <3;i++){
      this.localStorageService.set('bankAccount', form.value);
    }
    
  }

  dataSource: any[] = [];
  
}
