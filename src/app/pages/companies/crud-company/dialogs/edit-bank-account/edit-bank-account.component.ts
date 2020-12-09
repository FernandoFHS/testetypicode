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

    console.log(this.route.snapshot.paramMap)

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
    // const companies = this.partnerService.getPartners();
    // const companyPartner = companies[this.idPartner];

    //   this.partnerFormGroup = this._formBuilder.group({
    //     partnerSequentialNumber: [companyPartner.partnerSequentialNumber || 0],
    //     partnerName: [companyPartner.partnerName || ''],
    //     cpf: [companyPartner.cpf || ''],
    //     dateOfBirth: [companyPartner.dateOfBirth ||''],
    //     zipCode: [companyPartner.partnerAddress[0].street.zipCode || ''],
    //     streetName: [companyPartner.partnerAddress[0].street.streetName || ''],
    //     number: [companyPartner.partnerAddress[0].number || ''],
    //     complement: [companyPartner.partnerAddress[0].complement || ''],
    //     neighborhoodName: [companyPartner.partnerAddress[0].street.neighborhood.neighborhoodName || ''],
    //     cityName: [companyPartner.partnerAddress[0].street.city.cityName || ''],
    //     uf: [companyPartner.partnerAddress[0].street.state.uf || ''],
    //     phone: [companyPartner.partnerContact[0].phone || '']
    //   });

    const companies = this.partnerService.getBanks();
    const companyBank = companies[this.idBankDinamic];

    console.log(companyBank)

    this.accountFormGroup = this._formBuilder.group({
      bank: [companyBank.bank.name?.trim() || ''],
      agency: [companyBank.agency?.trim() || 0],
      agencyDigit: [companyBank.accountDigit?.trim() || 0],
      account: [companyBank.account?.trim() || 0],
      digit: [companyBank.digit?.trim() || 0],
      accountDigit: [companyBank.accountDigit?.trim() || 0],
      idBank: [companyBank.bank.idBank || 0],
      accountType: [companyBank.accountType?.trim() || 0],
      masterAccount: [companyBank.masterAccount || 0],
      idCompany: [this.idCompany || 0],
      idExternalBankAccount: [companyBank.idExternalBankAccount || 0],
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
