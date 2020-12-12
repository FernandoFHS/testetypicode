import { startWith, map, take } from 'rxjs/operators';
import { BankService } from './../../../../../services/company/bank.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from './../../../../../services/local-storage.service';
import { Bank } from '../../../../../models/company/Bank';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.scss']
})

export class AddBankAccountComponent implements OnInit {

  accountFormGroup: FormGroup;
  idBank: number;
  bankForm = new FormControl();
  bank: Array<Bank>;
  bank$: Observable<Array<Bank>>;
  filteredBanks: Observable<Bank[]>;
  bankValidatorError = false;
  trueMasterAccount: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    public dataService: DataService,
    private bankService: BankService,
    public httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private localStorageService: LocalStorageService) { }

    ngOnInit(): void {

      
      this.accountFormGroup = this._formBuilder.group({
        bank: ['', Validators.required],
        agency: ['', Validators.required],
        agencyDigit: [''],
        account: ['', Validators.required],
        digit: [''],
        accountDigit: [''],
        idBank:[''],
        accountType:[''],
        masterAccount: false,
        idCompany: 0,
        idExternalBankAccount: 0,
      })

      this.getAllBanks();
      this.masterAccountValidator();
  }

  masterAccountValidator() {
    let bankAccoutStorage = this.localStorageService.get('bankAccount');
    console.log(bankAccoutStorage)
    for (var i = 0; i <= bankAccoutStorage.length; i++) {
      console.log(bankAccoutStorage[i].masterAccount);
      if (bankAccoutStorage[i].masterAccount == true) {
        this.trueMasterAccount = true;
      }
    }
  } 

  getAllBanks(){
    this.bankService.getAllCnae()
    .pipe(take(1))
    .subscribe((data) => {
      this.bank$ = of(data.content);
      this.filteredBanks = this.bankForm.valueChanges
      .pipe(
        startWith(''),
        map(bank => this._filterBanks(bank))
      );
    });
  }
  displayFn = (item): string =>{
    if (item) {
      return item.name;
    }else {
      return '';
    }
  }
  private _filterBanks(value: string): Bank[] {
    const filterValue = value.toLowerCase();
    this.bank$.subscribe(banks => {
      this.bank = banks.filter(bank => bank.name.toLowerCase().indexOf(filterValue) === 0);
    })
    return this.bank;
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

  getAutoCompleteErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Escolha um banco da lista'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  saveAccount(form){
    let idBank = {
    idBank : form.value.bank.idBank,
    };
    this.accountFormGroup.patchValue(idBank);
    
    let bankAccountArray = this.localStorageService.get('bankAccount');
    if(!bankAccountArray){
      bankAccountArray= [];
    }
    
    bankAccountArray.push(form.value);

    let bankValidator = form.value.bank;

    if (typeof bankValidator === 'object') {  

      this.localStorageService.set('bankAccount', bankAccountArray);

      this.dataService.openSnackBar('Conta adicionada com sucesso', 'X');
      this.dialogRef.close(form);
    } else {
      this.bankValidatorError = true;
    }
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

}
