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
import { CepService } from 'src/app/services/cep.service';
import { DataService } from 'src/app/services/data.service';
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
  cep: number;
  isChecked = false;
  isCheckedBankAdress = false;
  mask = '0000000000000000';
  response: any;
  dataSource: any[] = [];
  dinamicAddRouter = "/company-list/add-partner";

  constructor(
    private _formBuilder: FormBuilder,
    private CepService: CepService,
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit(): void {
    this.identificationFormGroup = this._formBuilder.group({
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
      benefitedTypeCtrl: [
        { value: 'Pessoa Jurídica', disabled: true },
        Validators.required,
      ],
      benefitedNameCtrl: [{ value: '', disabled: true }, Validators.required],
      cnpjCtrl: [{ value: '', disabled: true }, Validators.required],
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
    { text: 'Banco', value: 'id' },
    { text: 'Agência', value: 'nameprofile' },
    { text: 'Dígito Agência', value: 'title' },
    { text: 'Conta Corrente', value: 'description' },
    { text: 'Dígito Conta', value: 'razsoc' },
    { text: 'Dígito Agência/Conta', value: 'mcc' },
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

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  
  getFirstCep(value) {
    this.cep = value;
    this.CepService.getCep(this.cep).subscribe((response: any) => {
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
    this.cep = cep;
    this.CepService.getCep(this.cep).subscribe((response: any) => {
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
      this.adressFormGroup.get('subordinateZipCode').disable();
      this.adressFormGroup.get('subordinateNeighborhoodCtrl').disable();
      this.adressFormGroup.get('subordinateCityCtrl').disable();
      this.adressFormGroup.get('subordinateStreetCtrl').disable();
      this.adressFormGroup.get('subordinateStateCtrl').disable();
      this.adressFormGroup.get('subordinateNumberCtrl').disable();
      this.adressFormGroup.get('subordinateComplementCtrl').disable();
      this.adressFormGroup.get('subordinateResponsibleNameCtrl').disable();
      this.adressFormGroup.get('subordinateReferencePointCtrl').disable();
      this.isChecked = true;
    } else {
      this.adressFormGroup.get('subordinateZipCode').enable();
      this.adressFormGroup.get('subordinateNeighborhoodCtrl').enable();
      this.adressFormGroup.get('subordinateCityCtrl').enable();
      this.adressFormGroup.get('subordinateStreetCtrl').enable();
      this.adressFormGroup.get('subordinateStateCtrl').enable();
      this.adressFormGroup.get('subordinateNumberCtrl').enable();
      this.adressFormGroup.get('subordinateComplementCtrl').enable();
      this.adressFormGroup.get('subordinateResponsibleNameCtrl').enable();
      this.adressFormGroup.get('subordinateReferencePointCtrl').enable();
      this.isChecked = false;
    }
  }


  checkValueBankAdress(e) {
    let isCheckedBankAdress = e.checked;
    if (isCheckedBankAdress == true) {
      this.isCheckedBankAdress = true;
      this.conditionFormGroup.get('benefitedTypeCtrl').enable();
      this.conditionFormGroup.get('benefitedNameCtrl').enable();
      this.conditionFormGroup.get('cnpjCtrl').enable();
    } else {
      this.isCheckedBankAdress = false;
      this.conditionFormGroup.get('benefitedTypeCtrl').disable();
      this.conditionFormGroup.get('benefitedNameCtrl').disable();
      this.conditionFormGroup.get('cnpjCtrl').disable();
    }
  }

  getCpfCnpjMask(a) {
    if (a === 'pf') {
      this.mask = '000.000.000-00';
    } if (a === 'pj') {
      this.mask = '00.000.000/0000-00';
    }
  }
}
