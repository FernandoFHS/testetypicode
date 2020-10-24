import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { CompanyContent, Mcc, RootObject } from 'src/app/models/Company';
import { CepService } from 'src/app/services/cep.service';
import { DataService } from 'src/app/services/data.service';
import { CompanyService } from 'src/app/services/company.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddBankAccountComponent } from '../dialogs/add-bank-account/add-bank-account.component';
import { EditBankAccountComponent } from '../dialogs/edit-bank-account/edit-bank-account.component';
import { DeleteBankAccountComponent } from '../dialogs/delete-bank-account/delete-bank-account.component';
import { LocalStorageService } from './../../services/local-storage.service';
import { DeletePhoneComponent } from '../dialogs/delete-phone/delete-phone.component';
import { DeletePartnerComponent } from '../dialogs/delete-partner/delete-partner.component';
import { EditPhoneComponent } from '../dialogs/edit-phone/edit-phone.component';
import { AddPhoneComponent } from '../dialogs/add-phone/add-phone.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR',
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AddCompanyComponent implements OnInit {

  isLinear = false;
  identificationFormGroup: FormGroup;
  adressFormGroup: FormGroup;
  conditionFormGroup: FormGroup;
  complementFormGroup: FormGroup;
  partnerFormGroup: FormGroup;
  isChecked = false;
  isCheckedBankAdress = false;
  mask: any;
  response: any;
  dataSource: any[] = [];
  dinamicAddRouter = "/company-list/add-partner";
  identification: any = this.localStorageService.get('identificationFormGroup');
  adress: any = this.localStorageService.get('adressFormGroup');
  condition: any = this.localStorageService.get('conditionFormGroup');
  complement: any = this.localStorageService.get('complementFormGroup');
  partner: any = this.localStorageService.get('partnerFormGroup');
  bankAccount : any = this.localStorageService.get('bankAccount');

  constructor(
    private _formBuilder: FormBuilder,
    private CepService: CepService,
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.identificationFormGroup = this._formBuilder.group({
      registerTargetCtrl: ['', Validators.required],
      managingCompanyCtrl: ['', Validators.required], 
      establishmentCtrl: [{ value: '', disabled: true }],
      companyTypeCtrl: ['', Validators.required],
      companyResponsibleNameCtrl: ['', Validators.required],
      acquiringEstablishmentCtrl: ['', Validators.required],
      stateRegistrationCtrl: ['', Validators.required],
      companyNameCtrl: ['', Validators.required],
      fantasyNameCtrl: ['', Validators.required],
      companyShortNameCtrl: ['', Validators.required],
      merchantCategoryCodeCtrl: ['', Validators.required],
      departamentCtrl: ['', Validators.required],
      nationalClassificationCtrl: ['', Validators.required],
      commercialActivityCtrl: ['', Validators.required],
      openingDateCtrl: ['', Validators.required],
      commercialPartnerCtrl: ['', Validators.required],
      createUserNameCtrl: [{ value: '', disabled: true }],
      createTimeCtrl: [{ value: '', disabled: true }],
      changeUserNameCtrl: [{ value: '', disabled: true }],
      changeTimeCtrl: [{ value: '', disabled: true }],
    });
    this.adressFormGroup = this._formBuilder.group({
      streetCtrl: ['', Validators.required],
      numberCtrl: ['', Validators.required],
      complementCtrl: ['', Validators.required],
      neighborhoodCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      stateCtrl: ['', Validators.required],
      responsibleNameCtrl: ['', Validators.required],
      referencePointCtrl: ['', Validators.required],
      keyZipCode: ['', Validators.required],
      checkboxAdress: ['', Validators.required],
      subordinateZipCode: ['', Validators.required],
      subordinateNeighborhoodCtrl: ['', Validators.required],
      subordinateCityCtrl: ['', Validators.required],
      subordinateStreetCtrl: ['', Validators.required],
      subordinateNumberCtrl: ['', Validators.required],
      subordinateComplementCtrl: ['', Validators.required],
      subordinateStateCtrl: ['', Validators.required],
      subordinateResponsibleNameCtrl: ['', Validators.required],
      subordinateReferencePointCtrl: ['', Validators.required],
    });
    this.conditionFormGroup = this._formBuilder.group({
     // externalBankAccount: [[this.bankAccount]],
      tableSaleCtrl: ['', Validators.required],
      comercialCredit: ['', Validators.required],
      transactionCostCtrl: ['', Validators.required],
      tedCostCtrl: ['', Validators.required],
      referralTransacionCtrl: ['', Validators.required],
      anticipationFeeCtrl: ['', Validators.required],
      ignoreRuleAjCtrl: ['', Validators.required],
      tratamentAjCtrl: ['', Validators.required],
      agencyCtrl: ['', Validators.required],
      agencyDigitCtrl: ['', Validators.required],
      currentAccountCtrl: ['', Validators.required],
      currentAccountDigitCtrl: ['', Validators.required],
      currentAccountAgencyCtrl: ['', Validators.required],
      benefitedTypeCtrl: ['',{ value: '', disabled: true },Validators.required,],
      benefitedNameCtrl: ['',{ value: '', disabled: true }, Validators.required],
      cnpjCtrl: ['',{ value: '', disabled: true }, Validators.required],
    });
    this.complementFormGroup = this._formBuilder.group({
      openingHoursCtrl: [Validators.required],
      urlEcommerceCtrl: ['', Validators.required],
      urlCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      posAmountCtrl: ['', Validators.required],
      logicNumberCtrl: ['', Validators.required],
      idTerminalCtrl: ['', Validators.required],
      codeSoftwareCtrl: ['', Validators.required],
    });
    this.partnerFormGroup = this._formBuilder.group({});

    this.dataService.refreshTable().subscribe(() => {
      this.loadData();
    });

    this.loadData();

    if (this.identification != undefined) {
      this.getLocalStorage('identification');
    } else {
      console.log("localstorage vazio");
    }

    if(this.adress != undefined){
      this.getLocalStorage('adress');
    }else {
      console.log("localstorage vazio");
    }

    if(this.condition != undefined){
      this.getLocalStorage('condition');
    }else {
      console.log("localstorage vazio");
    }
    if(this.complement != undefined){
      this.getLocalStorage('complement');
    }else {
      console.log("localstorage vazio");
    }
    if(this.partner != undefined){
      this.getLocalStorage('partner');
    }else {
      console.log("localstorage vazio");
    }

    
    if(this.response == null){
      this.response = this.localStorageService.get('cep');
    }

    if (this.mask == undefined) {
      this.getCpfCnpjMask(this.identificationFormGroup.get('companyTypeCtrl').value);
    }
  }

  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
    { text: 'CPF / CNPJ', value: 'title' },
    { text: 'Identificação', value: 'nameprofile' },
    { text: 'Tipo', value: 'description' },
    { text: 'Razão Social', value: 'razsoc' },
    { text: 'MCC	', value: 'mcc' },
    { text: 'Parceiro', value: 'parner' },
    { text: 'Status', value: 'status' },
    { text: 'Tab.Vendas', value: 'tabsell' },
    { text: 'Situação', value: 'situation' },

    // { text: 'Ações', value: 'action' }
  ];

  headersBankTable: HeaderModel[] = [
    { text: 'Banco', value: 'bank' },
    { text: 'Agência', value: 'agency' },
    { text: 'Dígito Agência', value: 'agencyDigit' },
    { text: 'Conta Corrente', value: 'account' },
    { text: 'Dígito Conta', value: 'accountDigit' },
    { text: 'Dígito Agência/Conta', value: 'digit' },
    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true,
  };

  public loadData() {
    //this.exampleDatabase = new DataService(this.httpClient);

    this.dataService.getAllProfiles().then(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        // TODO
      }
    );
  }

  /**   bank: ['', Validators.required],
        agency: ['', Validators.required],
        agencyDigit: ['', Validators.required],
        account: ['', Validators.required],
        digit: ['', Validators.required],
        accountDigit: ['', Validators.required] */


  //Add Methods
  onAddPhone(idPhone: number) {
    const dialogRef = this.dialog.open(AddPhoneComponent, {
      data: { id: idPhone },
    });
  }

  onAddBankAccount(idBankAccount: number) {
    const dialogRef = this.dialog.open(AddBankAccountComponent, {
      data: { id: idBankAccount },
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.bankAccount= this.localStorageService.get('bankAccount');

    })
  }

  onAddPartner(index: number) {
    this.router.navigate(['/company-list/add-partner']);
  }

  //Edit Methods
  onEditPhone(idProfile: number) {
    const dialogRef = this.dialog.open(EditPhoneComponent, {
      data: { id: idProfile },
    });
  }

  onEditBankAccount(idPhone: number) {
    const dialogRef = this.dialog.open(EditBankAccountComponent, {
      data: { id: idPhone },
    });
  }

  onEditPartner(idPartner: number) {
    const dialogRef = this.dialog.open(EditBankAccountComponent, {
      data: { id: idPartner },
    });
  }

  //Delete Methods
  onDeletePhone(idPhone: number) {
    const dialogRef = this.dialog.open(DeletePhoneComponent, {
      data: { id: idPhone },
    });
  }

  onDeleteBankAccount(idBankAccount: number) {
    const dialogRef = this.dialog.open(DeleteBankAccountComponent, {
      data: { id: idBankAccount },
    });
  }

  onDeletePartner(idPartner: number) {
    const dialogRef = this.dialog.open(DeletePartnerComponent, {
      data: { id: idPartner },
    });
  }

  //submit form
  submitForm() {
    console.log(this.identificationFormGroup.value);
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getFirstCep(value) {
    this.CepService.getCep(value).subscribe((response: any) => {
      let cep1 = {
        cityCtrl: response.localidade,
        streetCtrl: response.logradouro,
        neighborhoodCtrl: response.bairro,
        stateCtrl: response.uf,
      };
      this.response = response;
      this.adressFormGroup.patchValue(cep1);
    });
    if (this.isChecked == true) {
      this.getSecondCep(value);
    }
  }

  getSecondCep(cep) {
    this.CepService.getCep(cep).subscribe((response: any) => {
      let cep2 = {
        subordinateZipCode: response.cep,
        subordinateCityCtrl: response.localidade,
        subordinateStreetCtrl: response.logradouro,
        subordinateNeighborhoodCtrl: response.bairro,
        subordinateStateCtrl: response.uf,
      };
      this.adressFormGroup.patchValue(cep2);
    });
  }

  checkValue(e) {
    let a = e.checked;
    if (a == true) {
      this.isChecked = true;
      let obj = {
        subordinateZipCode: this.response.cep,
        subordinateNeighborhoodCtrl: this.response.bairro,
        subordinateCityCtrl: this.response.localidade,
        subordinateStreetCtrl: this.response.logradouro,
        subordinateStateCtrl: this.response.uf,
        subordinateNumberCtrl: this.adressFormGroup.get('numberCtrl').value,
        subordinateComplementCtrl: this.adressFormGroup.get('complementCtrl').value,
        subordinateResponsibleNameCtrl: this.adressFormGroup.get('responsibleNameCtrl').value,
        subordinateReferencePointCtrl: this.adressFormGroup.get('referencePointCtrl').value,
      };
      this.adressFormGroup.patchValue(obj);
    }
    if (a == false) {
      this.isChecked = false;
      let obj = {
        subordinateZipCode: '',
        subordinateNeighborhoodCtrl: '',
        subordinateCityCtrl: '',
        subordinateStreetCtrl: '',
        subordinateStateCtrl: '',
        subordinateNumberCtrl: '',
        subordinateComplementCtrl: '',
        subordinateResponsibleNameCtrl: '',
        subordinateReferencePointCtrl: '',
      };
      this.adressFormGroup.patchValue(obj);
    }
  }
  onSelectionChanged(value) {
    let a = value.checked;
    console.log(value.checked);
    if (a === true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }


  checkValueBankAdress(e) {
    let isCheckedBankAdress = e.checked;
    if (isCheckedBankAdress == true) {
      this.isCheckedBankAdress = true;
    } else {
      this.isCheckedBankAdress = false;
    }
  }

  getCpfCnpjMask(a) {
    if (a === 'pf') {
      this.mask = '000.000.000-00';
    } if (a === 'pj') {
      this.mask = '00.000.000/0000-00';
    }
  }

  saveForm(form, text) {
    console.log(form)
    this.localStorageService.set(text, form.value);
    this.localStorageService.set('cep',this.response);
  }

  getLocalStorage(item) {

    if (item == 'identification') {

      let localStorageIdentification = {
        companyTypeCtrl: this.identification.companyTypeCtrl,
        companyResponsibleNameCtrl: this.identification.companyResponsibleNameCtrl,
        acquiringEstablishmentCtrl: this.identification.acquiringEstablishmentCtrl,
        stateRegistrationCtrl: this.identification.stateRegistrationCtrl,
        companyNameCtrl: this.identification.companyNameCtrl,
        fantasyNameCtrl: this.identification.fantasyNameCtrl,
        companyShortNameCtrl: this.identification.companyShortNameCtrl,
        merchantCategoryCodeCtrl: this.identification.merchantCategoryCodeCtrl,
        departamentCtrl: this.identification.departamentCtrl,
        nationalClassificationCtrl: this.identification.nationalClassificationCtrl,
        commercialActivityCtrl: this.identification.commercialActivityCtrl,
        openingDateCtrl: this.identification.openingDateCtrl,
        commercialPartnerCtrl: this.identification.commercialPartnerCtrl,
      };
      this.identificationFormGroup.patchValue(localStorageIdentification);
    }

    if (item == 'adress') {
      let localStorageAdress = {
        streetCtrl: this.adress.streetCtrl,
        numberCtrl: this.adress.numberCtrl,
        complementCtrl: this.adress.complementCtrl,
        neighborhoodCtrl: this.adress.neighborhoodCtrl,
        cityCtrl: this.adress.cityCtrl,
        stateCtrl: this.adress.stateCtrl,
        responsibleNameCtrl: this.adress.responsibleNameCtrl,
        referencePointCtrl: this.adress.referencePointCtrl,
        keyZipCode: this.adress.keyZipCode,
        subordinateZipCode: this.adress.subordinateZipCode,
        subordinateNeighborhoodCtrl: this.adress.subordinateNeighborhoodCtrl,
        subordinateCityCtrl: this.adress.subordinateCityCtrl,
        subordinateStreetCtrl: this.adress.subordinateStreetCtrl,
        subordinateNumberCtrl: this.adress.subordinateNumberCtrl,
        subordinateComplementCtrl: this.adress.subordinateComplementCtrl,
        subordinateStateCtrl: this.adress.subordinateStateCtrl,
        subordinateResponsibleNameCtrl: this.adress.subordinateResponsibleNameCtrl,
        subordinateReferencePointCtrl: this.adress.subordinateReferencePointCtrl,
      };
      this.isChecked = this.adress.checkboxAdress;
      this.adressFormGroup.patchValue(localStorageAdress);
    }

    if(item == 'condition'){
      let localStorageCondition = {
        agencyCtrl: this.condition.agencyCtrl,
        agencyDigitCtrl: this.condition.agencyDigitCtrl,
        anticipationFeeCtrl: this.condition.anticipationFeeCtrl,
        comercialCredit: this.condition.comercialCredit,
        currentAccountAgencyCtrl: this.condition.currentAccountAgencyCtrl,
        currentAccountCtrl: this.condition.currentAccountCtrl,
        currentAccountDigitCtrl: this.condition.currentAccountDigitCtrl,
        ignoreRuleAjCtrl: this.condition.ignoreRuleAjCtrl,
        referralTransacionCtrl: this.condition.referralTransacionCtrl,
        tableSaleCtrl: this.condition.tableSaleCtrl,
        tedCostCtrl: this.condition.tedCostCtrl,
        transactionCostCtrl: this.condition.transactionCostCtrl,
        tratamentAjCtrl: this.condition.tratamentAjCtrl,
      }
      this.conditionFormGroup.patchValue(localStorageCondition);
    }

    if(item == 'complement'){
      let localStorageComplement = {
        codeSoftwareCtrl: this.complement.codeSoftwareCtrl,
        emailCtrl: this.complement.emailCtrl,
        idTerminalCtrl: this.complement.idTerminalCtrl,
        logicNumberCtrl: this.complement.logicNumberCtrl,
        posAmountCtrl: this.complement.posAmountCtrl,
        urlCtrl: this.complement.urlCtrl,
        urlEcommerceCtrl: this.complement.urlEcommerceCtrl,
      }
      this.complementFormGroup.patchValue(localStorageComplement);
    }

    if(item == 'partner'){

    }
  }
}
