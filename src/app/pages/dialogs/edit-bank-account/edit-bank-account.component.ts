import { BankService } from './../../../services/company/bank.service';
import { take, startWith, map } from 'rxjs/operators';
import { Bank } from './../../../models/company/Bank';
import { Observable, of } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-edit-bank-account',
  templateUrl: './edit-bank-account.component.html',
  styleUrls: ['./edit-bank-account.component.scss'],
})
export class EditBankAccountComponent implements OnInit {
  accountFormGroup: FormGroup;
  bankAccount: any = this.localStorageService.get('bankAccount');
  bankForm = new FormControl();
  bank: Array<Bank>;
  bank$: Observable<Array<Bank>>;
  filteredBanks: Observable<Bank[]>;
  bankValidatorError = false;

  constructor(
    public dialogRef: MatDialogRef<EditBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private bankService: BankService,
    private _formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.accountFormGroup = this._formBuilder.group({
      bank: ['', Validators.required],
      agency: ['', Validators.required],
      agencyDigit: [''],
      account: ['', Validators.required],
      digit: [''],
      accountDigit: [''],
    });

    if (this.bankAccount != undefined) {
      this.getLocalStorage('bankAccount');
    }

    this.getAllBanks();
  }

  private _filterBanks(value: string): Bank[] {
    const filterValue = value.toLowerCase();
    this.bank$.subscribe((banks) => {
      this.bank = banks.filter(
        (bank) => bank.name.toLowerCase().indexOf(filterValue) === 0
      );
    });
    return this.bank;
  }
  getAllBanks() {
    this.bankService
      .getAllCnae()
      .pipe(take(1))
      .subscribe((data) => {
        this.bank$ = of(data.content);
        this.filteredBanks = this.bankForm.valueChanges.pipe(
          startWith(''),
          map((bank) => this._filterBanks(bank))
        );
      });
  }

  displayFn = (item): string => {
    if (item) {
      return item.name;
    } else {
      return '';
    }
  };

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

  editAccount(form) {
    let index = this.data;

    let editableItem = {
      bank: this.accountFormGroup.get('bank').value,
      agency: this.accountFormGroup.get('agency').value,
      agencyDigit: this.accountFormGroup.get('agencyDigit').value,
      account: this.accountFormGroup.get('account').value,
      digit: this.accountFormGroup.get('digit').value,
      accountDigit: this.accountFormGroup.get('accountDigit').value,
    };

    let bankValidator = form.value.bank;
    console.log(bankValidator);

    if (typeof bankValidator === 'object') {
      if (index > -1) {
        Object.assign(this.bankAccount[index], editableItem);
        localStorage.setItem('bankAccount', JSON.stringify(this.bankAccount));
        this.dialogRef.close(this.bankAccount);
      } else {
        console.log(editableItem);
      }
    } else {
      this.bankValidatorError = true;
    }
  }

  getLocalStorage(item) {
    if (item == 'bankAccount') {
      let localStorage = {
        bank: this.bankAccount[this.data].bank,
        agency: this.bankAccount[this.data].agency,
        agencyDigit: this.bankAccount[this.data].agencyDigit,
        account: this.bankAccount[this.data].account,
        digit: this.bankAccount[this.data].digit,
        accountDigit: this.bankAccount[this.data].accountDigit,
      };
      this.accountFormGroup.patchValue(localStorage);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
