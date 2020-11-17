import { map, take, startWith, filter } from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel, HeaderModelBank } from 'src/app/@core/models/header.model';
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
import { LocalStorageService } from './../../services/local-storage.service';
import { DeletePhoneComponent } from '../dialogs/delete-phone/delete-phone.component';
import { DeletePartnerComponent } from '../dialogs/delete-partner/delete-partner.component';
import { EditPhoneComponent } from '../dialogs/edit-phone/edit-phone.component';
import { AddPhoneComponent } from '../dialogs/add-phone/add-phone.component';
import { CnaeService } from '../../services/company/cnae.service';
import { Cnae } from '../../models/company/Cnae'
import { Observable, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { SimpleDataTableService } from 'src/app/@core/components/simple-data-table/simple-data-table.service';
import { CompanyService } from '../../services/company.service';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';

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

  cnaeForm = new FormControl();
  isLinear = false;
  identificationFormGroup: FormGroup;
  adressFormGroup: FormGroup;
  conditionFormGroup: FormGroup;
  complementFormGroup: FormGroup;
  partnerFormGroup: FormGroup;

  contactFormGroup: FormGroup;
  bankingFormGroup: FormGroup;

  testeform: FormArray;
  isChecked = false;
  isCheckedBankAdress = true;
  isCheckedSituation = false;
  mask: any;
  response: any;
  dataSource: any[] = [];
  dinamicAddRouter = "/company-list/add-partner";
  identification: any = this.localStorageService.get('identificationFormGroup');
  adress: any = this.localStorageService.get('adressFormGroup');
  condition: any = this.localStorageService.get('conditionFormGroup');
  complement: any = this.localStorageService.get('complementFormGroup');
  partner: any = this.localStorageService.get('partnerFormGroup');
  partnerSource$: any = [];
  bankAccount$: any = [];
  phoneNumber$: any = [];

  mcc: any;

  cnae: Array<Cnae>;
  cnae$: Observable<Array<Cnae>>;
  filteredCnaes: Observable<Cnae[]>;

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Estabelecimento',
      route: 'add-company'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Estabelecimentos', route: 'company-list' }
    ]
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private CepService: CepService,
    private dataService: DataService,
    private cnaeService: CnaeService,
    private companyService: CompanyService,
    public dialog: MatDialog,
    private router: Router,
    private localStorageService: LocalStorageService,
    public phoneService: SimpleDataTableService
  ) { }

  private _filterCnaes(value: string): Cnae[] {
    const filterValue = value.toLowerCase();
    this.cnae$.subscribe(cnaes => {
      this.cnae = cnaes.filter(cnae => cnae.description.toLowerCase().indexOf(filterValue) === 0);
    })
    return this.cnae;
  }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {

    if (this.localStorageService.get('phoneNumber') == null) {
      this.phoneNumber$ = []
    } else {
      this.phoneNumber$ = this.localStorageService.get('phoneNumber');
    }

    if (this.localStorageService.get('bankAccount') == null) {
      this.bankAccount$ = []
    } else {
      this.bankAccount$ = this.localStorageService.get('bankAccount');
    }

    if (this.localStorageService.get('partnerFormGroup') == null) {
      this.partnerSource$ = []
    } else {
      this.partnerSource$ = this.localStorageService.get('partnerFormGroup');
    }

    this.identificationFormGroup = this._formBuilder.group({
      registerTarget: [{ value: 'Estabelecimento', disabled: true }],
      companyResponsibleName: [this.identification?.companyResponsibleName || ''],
      companyType: [this.identification?.companyType || '', Validators.required],
      situation: [this.identification?.situation || '', Validators.required],
      documentNumberCompany: [this.identification?.documentNumberCompany || '', Validators.required],
      gpEstablishmentNumber: [this.identification?.gpEstablishmentNumber || '', Validators.required],
      stateRegistration: [this.identification?.stateRegistration || '', Validators.required],
      companyName: [this.identification?.companyName || '', Validators.required],
      fancyName: [this.identification?.fancyName || '', Validators.required],
      companyShortName: [this.identification?.companyShortName || '', Validators.required],
      mcccode: [this.identification?.mcccode || '', Validators.required],
      idDepartament: [this.identification?.idDepartament || '', Validators.required],
      cnae: [this.identification?.cnae || '', Validators.required],
      idCnae: [this.identification?.idCnae || ''],
      businessActivity: [this.identification?.businessActivity || '', Validators.required],
      openingDate: [this.identification?.openingDate || '', Validators.required]
    });
    this.adressFormGroup = this._formBuilder.group({
      streetName: [this.adress?.streetName || '', Validators.required],
      number: [this.adress?.number || '', Validators.required],
      complement: [this.adress?.complement || '', Validators.required],
      neighborhoodName: [this.adress?.neighborhoodName || '', Validators.required],
      cityName: [this.adress?.cityName || '', Validators.required],
      uf: [this.adress?.uf || '', Validators.required],
      responsibleNameCtrl: [this.adress?.responsibleNameCtrl || '', Validators.required],
      referencePoint: [this.adress?.referencePoint || ''],
      zipCode: [this.adress?.zipCode || '', Validators.required],
      checkboxAdress: [this.adress?.checkboxAdress || '', Validators.required],
      subordinateZipCode: ['', Validators.required],
      subordinateNeighborhoodCtrl: ['', Validators.required],
      subordinateCityCtrl: ['', Validators.required],
      subordinateStreetCtrl: ['', Validators.required],
      subordinateNumberCtrl: ['', Validators.required],
      subordinateComplementCtrl: ['', Validators.required],
      subordinateStateCtrl: ['', Validators.required],
      subordinateResponsibleNameCtrl: ['', Validators.required],
      subordinateReferencePointCtrl: [''],
    });




    this.conditionFormGroup = this._formBuilder.group({
      tableSaleCtrl: [this.condition?.tableSaleCtrl || '', Validators.required],
      automaticCreditIndicator: [this.condition?.automaticCreditIndicator || '', Validators.required],
      transactionAmount: [this.condition?.transactionAmount || '', Validators.required],
      tedAmount: [this.condition?.tedAmount || '', Validators.required],
      referentialTransacionAmount: [this.condition?.referentialTransacionAmount || '', Validators.required],
      anticipationFee: [this.condition?.anticipationFee || '', Validators.required],
      ignoreLiberationAJManual: [this.condition?.ignoreLiberationAJManual || '', Validators.required],
      ajtype: [this.condition?.ajtype || '', Validators.required],
      beneficiaryType: [this.condition?.beneficiaryType || '', Validators.required,],
      beneficiaryName: [this.condition?.beneficiaryName || '', Validators.required],
      beneficiaryDocumentNumber: [this.condition?.beneficiaryDocumentNumber || '', Validators.required],
    });
    this.complementFormGroup = this._formBuilder.group({
      openingHours: [this.complement?.openingHours || '', Validators.required],
      ecommerceURL: [this.complement?.ecommerceURL || '', Validators.required],
      estUrl: [this.complement?.estUrl || '', Validators.required],
      email: [this.complement?.email || '', Validators.required],
      posQuantity: [this.complement?.posQuantity || '', Validators.required],
      logicalNumber: [this.complement?.logicalNumber || '', Validators.required],
      idTerminal: [this.complement?.idTerminal || '', Validators.required],
      registerCode: [this.complement?.registerCode || '', Validators.required],
      registrationDate: [this.complement?.registrationDate || ''],
      gpSendDate: [this.complement?.gpSendDate || ''],
      accreditationDate: [this.complement?.accreditationDate || ''],
      gpAffiliationDate: [this.complement?.gpAffiliationDate || ''],
      seRegistrationDate: [this.complement?.seRegistrationDate || ''],
      discreditationDate: [this.complement?.discreditationDate || '']
    });
    this.partnerFormGroup = this._formBuilder.group({
      partnerSequentialNumber: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cep: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      contact: ['', Validators.required]
    });

    this.contactFormGroup = this._formBuilder.group({
      companyContact: this._formBuilder.array(this.phoneNumber$),
    });




    this.dataService.refreshTable().subscribe(() => {
      this.dataSource = this.phoneNumber$;
      //this.loadData
    });
    //this.loadData
    this.dataSource = this.phoneNumber$;
    this.gelAllCnaes();

    if (this.identification != undefined) {
      this.getLocalStorage('identification');
    } else {

    }

    if (this.adress != undefined) {
      this.getLocalStorage('adress');
    } else {

    }

    if (this.condition != undefined) {
      this.getLocalStorage('condition');
    } else {

    }
    if (this.complement != undefined) {
      this.getLocalStorage('complement');
    } else {

    }
    if (this.partner != undefined) {
      this.getLocalStorage('partner');
    } else {

    }
    // if (this.partnerSource$ != undefined) {
    //   this.partnerSource$ = this.localStorageService.get('partnerFormGroup');
    //   this.partnerSource$.content = this.localStorageService.get('partnerFormGroup');
    // } else {

    // }

    if (this.response == null) {
      this.response = this.localStorageService.get('cep');
    }

    if (this.mask == undefined) {
      this.getCpfCnpjMask(this.identificationFormGroup.get('companyType').value);
    }

    this.checkValueBankAdress(true);
  }


  createCompany() {
    let formcompleto = Object.assign({},
      this.identificationFormGroup.value,
      this.adressFormGroup.value,
      this.conditionFormGroup.value,
      this.complementFormGroup.value,
      this.contactFormGroup.value);
    console.log(formcompleto);

    this.companyService.create(formcompleto).subscribe((response: any) => {
      console.log(response);
      this.dataService.openSnackBar('Estabelecimento criado com sucesso', 'X');
      this.router.navigate(['/company-list/company']);
    });

  }

  gelAllCnaes() {
    this.cnaeService.getAllCnae()
      // .pipe(take(1))
      .subscribe((data) => {
        //console.log(data.content);
        this.cnae$ = of(data.content);

        this.filteredCnaes = this.cnaeForm.valueChanges
          .pipe(
            startWith(''),
            map(cnae => this._filterCnaes(cnae))
            //map(cnae => cnae ? this._filterCnaes(cnae) : this.cnae$.subscribe(cnaes => {return cnaes.slice()}))
          );
      });
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

  headersBankTable: HeaderModelBank[] = [
    { text: 'Banco', value: 'bank', subValue: 'name' },
    { text: 'Agência', value: 'agency', subValue: null },
    { text: 'Dígito Agência', value: 'agencyDigit', subValue: null },
    { text: 'Conta Corrente', value: 'account', subValue: null },
    { text: 'Dígito Conta', value: 'accountDigit', subValue: null },
    { text: 'Dígito Agência/Conta', value: 'digit', subValue: null },
    // { text: 'Ações', value: 'action' }
  ];

  headersFoneTable: HeaderModel[] = [
    { text: 'Nome do contato', value: 'contactName' },
    { text: 'Telefone', value: 'companyPhone' },
    // { text: 'Ações', value: 'action' }
  ];

  headersPartnerTable: HeaderModel[] = [
    { text: 'Número Sequência', value: 'partnerSequentialNumber' },
    { text: 'Nome', value: 'name' },
    { text: 'Data de Nascimento', value: 'dateOfBirth' },
    { text: 'CPF', value: 'cpf' },
    { text: 'Telefone', value: 'contact' },
    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: false,
  };

  actionsPartner: ActionModel = {
    add: true,
    edit: true,
    delete: true,
  };

  //Add Methods
  onAddPhone(idPhone: number) {
    const dialogRef = this.dialog.open(AddPhoneComponent, {
      data: { id: idPhone },
    });
    dialogRef.afterClosed().subscribe((item) => {
      // this.phoneNumber$ = this.localStorageService.get('phoneNumber');
      this.phoneNumber$.push(item.value);
      this.phoneNumber$ = [...this.phoneNumber$];
      this.phoneService.refreshDataTable();
    })
  }

  onAddBankAccount(idBankAccount: number) {
    const dialogRef = this.dialog.open(AddBankAccountComponent, {
      data: { id: idBankAccount },
    });
    dialogRef.afterClosed().subscribe((item) => {
      this.bankAccount$.push(item.value);
      this.bankAccount$ = [...this.bankAccount$];
      this.phoneService.refreshDataTable();
    })
  }

  onAddPartner(index: number) {
    this.router.navigate(['/add-partner']);
  }

  //Edit Methods
  onEditPhone(row: object) {
    const index = this.phoneNumber$.indexOf(row)
    const dialogRef = this.dialog.open(EditPhoneComponent, {
      data: index
    });
    dialogRef.afterClosed().subscribe((item) => {
      Object.assign(this.phoneNumber$, item);
      this.phoneService.refreshDataTable();
    })
  }

  onEditBankAccount(row: object) {
    const index = this.bankAccount$.indexOf(row)
    const dialogRef = this.dialog.open(EditBankAccountComponent, {
      data: index
    });
    dialogRef.afterClosed().subscribe((item) => {
      Object.assign(this.bankAccount$, item);;
      this.phoneService.refreshDataTable();
    })
  }

  onEditPartner(row: object) {
    const index = this.partnerSource$.findIndex((c) => c == row);

    this.router.navigate([`/edit-partner/${index}`]);
  }

  //Delete Methods
  // onDeletePhone(row: object) {
  //   // const deleteItem = this.phoneNumber$.indexOf(row);
  //   // const dialogRef = this.dialog.open(DeletePhoneComponent, {data: deleteItem});

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.phoneNumber$ = this.localStorageService.get('phoneNumber');
  //     this.phoneNumber.content = this.localStorageService.get('phoneNumber');
  //   })
  // }

  // onDeleteBankAccount(row: object) {
  //   const deleteItem = this.bankAccount.content.indexOf(row);
  //   const dialogRef = this.dialog.open(DeleteBankAccountComponent, {data: deleteItem});

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.bankAccount = this.localStorageService.get('bankAccount');
  //     this.bankAccount.content = this.localStorageService.get('bankAccount');
  //   })
  // }

  // onDeletePartner(row: object) {
  //   const deleteItem = this.partnerSource.content.indexOf(row);
  //   const dialogRef = this.dialog.open(DeletePartnerComponent, {data: deleteItem});

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.partnerSource = this.localStorageService.get('partnerFormGroup');
  //     this.partnerSource.content = this.localStorageService.get('partnerFormGroup');
  //   })
  // }

  //Filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bankAccount$.filter = filterValue.trim().toLowerCase();

    if (this.bankAccount$.paginator) {
      this.bankAccount$.paginator.firstPage();
    }
  }

  //Navigation Functions
  navigateToCompanyList() {
    this.router.navigate(['/company-list/company'])
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
        cityName: response.localidade,
        streetName: response.logradouro,
        neighborhoodName: response.bairro,
        uf: response.uf,
      };
      this.response = response;
      this.adressFormGroup.patchValue(cep1);
    });
    if (this.isChecked == true) {
      this.getSecondCep(value);
    }
  }

  displayFn = (item): string => {
    if (item) {
      this.mcc = item;
      return item.description;
    } else {
      return '';
    }
  }

  getMccByCnae() {
    let a = this.mcc
    console.log(a);
    let obj = {
      mcccode: a.mcc.code,
      idCnae: a.idCnae
    }
    this.identificationFormGroup.patchValue(obj);
    console.log(obj);
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
        subordinateNumberCtrl: this.adressFormGroup.get('number').value,
        subordinateComplementCtrl: this.adressFormGroup.get('complement').value,
        subordinateResponsibleNameCtrl: this.adressFormGroup.get('responsibleNameCtrl').value,
        subordinateReferencePointCtrl: this.adressFormGroup.get('referencePoint').value,
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

  checkValueBankAdress(value) {
    let a = value.checked;
    if (a == false) {
      this.isCheckedBankAdress = false;
      let obj = {
        beneficiaryDocumentNumber: this.identificationFormGroup.get('documentNumberCompany').value,
        beneficiaryName: this.identificationFormGroup.get('fancyName').value,
        beneficiaryType: this.identificationFormGroup.get('companyType').value,
      };
      this.conditionFormGroup.patchValue(obj);
    }
    if (a == true) {
      this.isCheckedBankAdress = true;
      let obj = {
        beneficiaryDocumentNumber: '',
        beneficiaryName: '',
        beneficiaryType: '',
      };
      this.conditionFormGroup.patchValue(obj);
    }
    if (value == false) {
      this.isCheckedBankAdress = false;
      let obj = {
        beneficiaryDocumentNumber: this.identificationFormGroup.get('documentNumberCompany').value,
        beneficiaryName: this.identificationFormGroup.get('fancyName').value,
        beneficiaryType: this.identificationFormGroup.get('companyType').value,
      };
      this.conditionFormGroup.patchValue(obj);
    }
  }

  getCpfCnpjMask(a) {
    if (a === 'PF') {
      this.mask = '000.000.000-00';
    } if (a === 'PJ') {
      this.mask = '00.000.000/0000-00';
    }
  }

  saveForm(form, text) {
    this.localStorageService.set(text, form.value);
    this.localStorageService.set('cep', this.response);
  }

  getLocalStorage(item) {


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

    if (item == 'condition') {
      let localStorageCondition = {
        agencyCtrl: this.condition.agencyCtrl,
        agencyDigitCtrl: this.condition.agencyDigitCtrl,
        anticipationFee: this.condition.anticipationFee,
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

    if (item == 'partner') {

    }
  }
}
