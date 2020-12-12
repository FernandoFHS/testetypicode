import { BankService } from './../../../../../services/company/bank.service';
import { take, startWith, map } from 'rxjs/operators';
import { Bank } from './../../../../../models/company/Bank';
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
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { DataService } from 'src/app/services/data.service';
import { ExternalBankAccount } from 'src/app/models/Company';

@Component({
  selector: 'app-edit-bank-account',
  templateUrl: './edit-bank-account.component.html',
  styleUrls: ['./edit-bank-account.component.scss'],
})
export class EditBankAccountComponent implements OnInit {
  accountFormGroup: FormGroup;
  bankAccount: any = this.localStorageService.get('bankAccount');
  dinamicBankAccount: any;
  bankForm = new FormControl();
  bank: Array<Bank>;
  bank$: Observable<Array<Bank>>;
  filteredBanks: Observable<Bank[]>;
  bankValidatorError = false;
  isLocalData: boolean;
  idCompany: number;
  idBankLocal: number;
  idBankDinamic: number;
  idCompanyGroup: any;
  model: ExternalBankAccount;

  constructor(
    public dialogRef: MatDialogRef<EditBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private bankService: BankService,
    private _formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private partnerService: PartnerService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    this.idBankLocal = this.data.localIndex;
    this.idBankDinamic = this.data.apiIndex;
    this.idCompany = this.data.idCompany;
    this.model = this.data.model;

    console.log(this.data);

    // console.log(this.idBankLocal);
    // console.log(this.idBankDinamic);
    // console.log(this.idCompany);

    this.idCompanyGroup = this.localStorageService.get('idCompanyGroup');
    console.log(this.idCompanyGroup);

    if (this.idBankLocal || this.idBankLocal == 0) {
      this.isLocalData = true;
      console.log('É local')
      this.loadLocalForm();
      if (this.bankAccount != undefined) {
        this.getLocalStorage('bankAccount');
      }
    } else {
      this.isLocalData = false;
      console.log('É dinâmico')
      this.loadDinamicForm();
    }
    this.getAllBanks();
  }

  loadLocalForm() {
    this.accountFormGroup = this._formBuilder.group({
      bank: ['', Validators.required],
      agency: ['', Validators.required],
      agencyDigit: [''],
      account: ['', Validators.required],
      digit: [''],
      accountDigit: [''],
      idBank: [''],
      accountType: [''],
      masterAccount: [''],
      idCompany: 0,
      idExternalBankAccount: 0,
    })    
  }

  loadDinamicForm() {
      console.log(this.model)

      this.accountFormGroup = this._formBuilder.group({
        bank: [this.model.bank || ''],
        agency: [this.model.agency?.trim() || 0],
        agencyDigit: [this.model.accountDigit?.trim() || 0],
        account: [this.model.account?.trim() || 0],
        digit: [this.model.digit?.trim() || 0],
        accountDigit: [this.model.accountDigit?.trim() || 0],
        idBank: [this.model.bank.idBank || 0],
        accountType: [this.model.accountType?.trim() || 0],
        masterAccount: [this.model.masterAccount || 0],
        idCompany: [this.idCompany || 0],
        idExternalBankAccount: [this.model.idExternalBankAccount || 0],
      // })
    })
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
    console.log('ERRO')
  }

  editAccount(form) {
    console.log('Uhul');
    //   let localIndex = this.data.localIndex;

    let editableItem = {
      bank: this.accountFormGroup.get('bank').value,
      agency: this.accountFormGroup.get('agency').value,
      agencyDigit: this.accountFormGroup.get('agencyDigit').value,
      account: this.accountFormGroup.get('account').value,
      digit: this.accountFormGroup.get('digit').value,
      accountDigit: this.accountFormGroup.get('accountDigit').value,
      masterAccount: this.accountFormGroup.get('masterAccount').value,
      accountType: this.accountFormGroup.get('accountType').value,
    };

    let bankValidator = form.value.bank;
    console.log(bankValidator);

    if (this.isLocalData) {
      if (typeof bankValidator === 'object') {
        if (this.idBankLocal > -1) {
          Object.assign(this.bankAccount[this.idBankLocal], editableItem);
          localStorage.setItem('bankAccount', JSON.stringify(this.bankAccount));
          this.dataService.openSnackBar('Conta editada com sucesso', 'X');
          this.dialogRef.close(editableItem);
        } else {
          console.log(editableItem);
        }
      } else {
        this.bankValidatorError = true;
      }
    } else {
      if (typeof bankValidator === 'object') {
        if (this.idBankDinamic > -1) {
          this.dataService.openSnackBar('Conta editada com sucesso', 'X');
          this.dialogRef.close(editableItem);
        } else {
          console.log(editableItem);
        }
      } else {
        this.bankValidatorError = true;
      }
    }
  }

  getLocalStorage(item) {
    if (item == 'bankAccount') {
      let localStorage = {
        bank: this.bankAccount[this.data.localIndex].bank,
        agency: this.bankAccount[this.data.localIndex].agency,
        agencyDigit: this.bankAccount[this.data.localIndex].agencyDigit,
        account: this.bankAccount[this.data.localIndex].account,
        digit: this.bankAccount[this.data.localIndex].digit,
        accountDigit: this.bankAccount[this.data.localIndex].accountDigit,
        masterAccount: this.bankAccount[this.data.localIndex].masterAccount,
        accountType: this.bankAccount[this.data.localIndex].accountType,
      };
      this.accountFormGroup.patchValue(localStorage);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
