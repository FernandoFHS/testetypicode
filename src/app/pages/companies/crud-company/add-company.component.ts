import { map, take, startWith, filter } from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AddBankAccountComponent } from './dialogs/add-bank-account/add-bank-account.component';
import { EditBankAccountComponent } from './dialogs/edit-bank-account/edit-bank-account.component';
import { DeleteBankAccountComponent } from './dialogs/delete-bank-account/delete-bank-account.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DeletePhoneComponent } from './dialogs/delete-phone/delete-phone.component';
import { DeletePartnerComponent } from './dialogs/delete-partner/delete-partner.component';
import { EditPhoneComponent } from './dialogs/edit-phone/edit-phone.component';
import { AddPhoneComponent } from './dialogs/add-phone/add-phone.component';
import { CnaeService } from '../../../services/company/cnae.service';
import { Cnae } from '../../../models/company/Cnae'
import { Observable, of, Subject, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { SimpleDataTableService } from 'src/app/@core/components/simple-data-table/simple-data-table.service';
import { CompanyService } from '../../../services/company.service';
import { CompanyByLevelService } from '../../../services/company/company-by-level.service';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { CompanyContent } from 'src/app/models/Company';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { PageTypeEnum } from 'src/app/enums/page-type.enum';
import { autoCompleteValidator } from 'src/app/app.validators';
import { GeneralService } from 'src/app/services/general.service';
import { PartnerService } from 'src/app/services/partner.service';
import { DOCUMENT } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';

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
export class AddCompanyComponent implements OnInit, OnDestroy {

  customCurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };


  cnaeForm = new FormControl();
  isLinear = false;
  identificationFormGroup: FormGroup;
  adressFormGroup: FormGroup;
  conditionFormGroup: FormGroup;
  complementFormGroup: FormGroup;

  partnerFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  bankingFormGroup: FormGroup;
  companyPartnerFormGroup: FormGroup;
  companyAdressFormGroup: FormGroup;


  endereco: any;
  formulariocompleto: any;

  optionscompany: any;
  optionscnae: any;

  dateformated: any;


  plus: any;
  pageType: PageTypeEnum;
  isLoading: boolean;
  id: number;

  testeform: FormArray;
  isChecked = false;
  isCheckedBankAdress = true;
  isCheckedSituation = false;
  mask: any;
  response: any;
  dataSource: any[] = [];
  dinamicAddRouter = "/companies/partners/add";
  identification: any = this.localStorageService.get('identificationFormGroup');
  adress: any = this.localStorageService.get('adressFormGroup');
  condition: any = this.localStorageService.get('conditionFormGroup');
  complement: any = this.localStorageService.get('complementFormGroup');
  partner: any = this.localStorageService.get('editPartner');
  companyadress: any = [];
  partnerSource$: any = [];
  apiPartnerSource$: any = [];
  bankAccount$: any = [];
  apiBankAccount$: any = [];
  phoneNumber$: any = [];
  apiPhoneNumber$: any = []

  addPage: boolean;
  companyValidatorError = false;
  idCompanyGroup: any;

  referencePointNullValue: boolean;
  accreditationDateNullValue: boolean;
  gpSendDateNullValue: boolean;
  registrationDateNullValue: boolean;
  gpAffiliationDateNullValue: boolean;
  seRegistrationDateNullValue: boolean;
  discreditationDateNullValue: boolean;

  onEditPartnerSubscription: Subscription;
  onAddPartnerSubscription: Subscription;
  onBackCompanySubscription: Subscription;

  testesocio: any = this.localStorageService.get('partnerFormGroup');

  mcc: any;
  companySelect: any;

  cnae: Array<Cnae>;
  cnae$: Observable<Array<Cnae>>;
  filteredCnaes: Observable<any[]>;
  filteredCompanies: Observable<any[]>;

  addBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Empresa',
      route: 'companies/list/add'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Empresa', route: 'companies/list' }
    ]
  };

  editBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Empresa',
      route: 'companies/list/edit'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Empresas', route: 'companies/list' }
    ]
  };

  viewBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Visualizar Empresa',
      route: 'companies/list/view'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Empresas', route: 'companies/list' }
    ]
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private CepService: CepService,
    private dataService: DataService,
    private cnaeService: CnaeService,
    private companyService: CompanyService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    public phoneService: SimpleDataTableService,
    public changeDetectorRefs: ChangeDetectorRef,
    public CompanyByLevelService: CompanyByLevelService,
    private _generalService: GeneralService,
    private partnerService: PartnerService,
    @Inject(DOCUMENT) private document: Document
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

  ngOnDestroy(): void {
    console.log('uhul')
    if (this.isPageEdit()) {
      this.onEditPartnerSubscription.unsubscribe();
      this.onAddPartnerSubscription.unsubscribe();
      this.onBackCompanySubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.idCompanyGroup = this.localStorageService.get('idCompanyGroup');

    this.isLoading = true;

    this.loadParams();

    if (this.isPageEdit()) {
      this.loadEditModel();
    }
    else if (this.isPageView()) {
      this.loadViewModel();
    }
    else {
      this.loadAddModel();
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

    // this.contactFormGroup = this._formBuilder.group({
    //   companyContact: this._formBuilder.array(this.phoneNumber$),
    // });

    // this.companyPartnerFormGroup = this._formBuilder.group({

    //   companyPartner: this._formBuilder.array(this.partnerSource$),

    // });

    // this.companyAdressFormGroup = this._formBuilder.group({

    //   companyAddress: this._formBuilder.array(this.companyadress),

    // });

    // this.contactFormGroup = this._formBuilder.group({
    //   companyContact: this._formBuilder.array(this.isPageEdit() ? this.apiPhoneNumber$ : this.phoneNumber$),
    // });

    // this.bankingFormGroup = this._formBuilder.group({
    //   externalBankAccount: this._formBuilder.array(this.isPageEdit() ? this.apiBankAccount$ : this.bankAccount$),
    // });

    this.gelAllCnaes();
    this.getCompanyLevel();

  }

  private loadAddModel() {

    this.addPage = true;

    if (this.localStorageService.get('phoneNumber') == null) {
      this.phoneNumber$ = []
    } else {
      this.phoneNumber$ = this.localStorageService.get('phoneNumber');
    }

    this.identificationFormGroup = this._formBuilder.group({
      registerTarget: [{ value: 'Estabelecimento', disabled: true }],
      companyResponsibleName: [this.identification?.companyResponsibleName || ''],
      companyResponsible: [this.identification?.companyResponsible || ''],
      companyType: [this.identification?.companyType || '', Validators.required],
      situation: [this.identification?.situation || '', Validators.required],
      documentNumberCompany: [this.identification?.documentNumberCompany || '', Validators.required],
      gpEstablishmentNumber: [parseInt(this.identification?.gpEstablishmentNumber) || ''],
      stateRegistration: [parseInt(this.identification?.stateRegistration) || '', Validators.required],
      companyName: [this.identification?.companyName || '', Validators.required],
      fancyName: [this.identification?.fancyName || '', Validators.required],
      companyShortName: [this.identification?.companyShortName || '', Validators.required],
      mcccode: [this.identification?.mcccode || '', Validators.required],
      idDepartament: [parseInt(this.identification?.idDepartament) || ''],
      idCompanyOwner: [''],
      cnae: [this.identification?.cnae || '', Validators.required],
      idCnae: [this.identification?.idCnae || ''],
      businessActivity: [this.identification?.businessActivity || '', Validators.required],
      openingDate: [this.identification?.openingDate || '', Validators.required]
    },
      { validator: autoCompleteValidator('companyResponsible') });

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
      referentialTransactionAmount: [this.condition?.referentialTransactionAmount || '', Validators.required],
      anticipationFee: [this.condition?.anticipationFee || '', Validators.required],
      ignoreLiberationAJManual: [this.condition?.ignoreLiberationAJManual || '', Validators.required],
      ajtype: [this.condition?.ajtype || '', Validators.required],
      isCheckedBankAdress: [],
      beneficiaryType: [this.condition?.beneficiaryType || '', Validators.required,],
      beneficiaryName: [this.condition?.beneficiaryName || '', Validators.required],
      beneficiaryDocumentNumber: [this.condition?.beneficiaryDocumentNumber || '', Validators.required],
    });
    this.complementFormGroup = this._formBuilder.group({
      openingHours: [this.complement?.openingHours || '', Validators.required],
      ecommerceURL: [this.complement?.ecommerceURL || '', Validators.required],
      estUrl: [this.complement?.estUrl || '', Validators.required],
      email: [this.complement?.email || '', Validators.required],
      posQuantity: [parseInt(this.complement?.posQuantity) || '', Validators.required],
      logicalNumber: [{ value: 0, disabled: true }],
      idTerminal: [this.complement?.idTerminal || '', Validators.required],
      registerCode: [this.complement?.registerCode || '', Validators.required],
      registrationDate: [this.complement?.registrationDate || ''],
      gpSendDate: [this.complement?.gpSendDate || ''],
      accreditationDate: [this.complement?.accreditationDate || ''],
      gpAffiliationDate: [this.complement?.gpAffiliationDate || ''],
      seRegistrationDate: [this.complement?.seRegistrationDate || ''],
      discreditationDate: [this.complement?.discreditationDate || '']
    });

    this.companyPartnerFormGroup = this._formBuilder.group({
      companyPartner: this._formBuilder.array(this.partnerSource$),
    });

    this.companyAdressFormGroup = this._formBuilder.group({
      companyAddress: this._formBuilder.array(this.companyadress),
    });

    this.contactFormGroup = this._formBuilder.group({
      companyContact: this._formBuilder.array(this.phoneNumber$),
    });

    this.bankingFormGroup = this._formBuilder.group({
      externalBankAccount: this._formBuilder.array(this.bankAccount$),
    });

    this.gelAllCnaes();

    if (this.adress != undefined) {
      this.getLocalStorage('adress');
    }

    if (this.response == null) {
      this.response = this.localStorageService.get('cep');
    }

    if (this.mask == undefined) {
      this.getCpfCnpjMask(this.identificationFormGroup.get('companyType').value);
    }
    this.checkValueBankAdress(true);

    this.partnerService.onAddPartner().subscribe((partner) => {
      this.apiPartnerSource$.push(partner);
      console.log(this.apiPartnerSource$);
      this.dataService.refreshTable();
    })
    this.partnerService.onBackCompany().subscribe(() => {
      this.document.body.scrollTop = 0;
      console.log(this.stepper)
      this.stepper.selectedIndex = 4;
    })
  }

  private loadEditModel() {
    this.addPage = false;

    this.companyService.readById(this.id, this.idCompanyGroup).subscribe((company) => {
      this.apiPhoneNumber$ = company.companyContact;
      this.apiBankAccount$ = company.externalBankAccount;
      this.apiPartnerSource$ = company.companyPartner;
      this.changeDetectorRefs.detectChanges();
      this.partnerService.setAllPartners(this.apiPartnerSource$);
      console.log(company)

      this.loadEditForm(company);
      this.editValues(company);
    });
    this.onEditPartnerSubscription = this.partnerService.onEditPartner().subscribe((params) => {
      this.apiPartnerSource$[params.index] = params.partner
      this.partnerService.setAllPartners(this.apiPartnerSource$);
      console.log(this.apiPartnerSource$);
      this.phoneService.refreshDataTable();
    })
    this.onAddPartnerSubscription = this.partnerService.onAddPartner().subscribe((partner) => {
      this.apiPartnerSource$.push(partner)
      this.partnerService.setAllPartners(this.apiPartnerSource$);
      console.log(this.apiPartnerSource$);
      this.phoneService.refreshDataTable();
    })
    this.onBackCompanySubscription = this.partnerService.onBackCompany().subscribe(() => {
      this.document.body.scrollTop = 0;
      console.log(this.stepper)
      this.stepper.selectedIndex = 4;
    })
  }

  private loadViewModel() {
    this.addPage = false;

    this.companyService.readById(this.id, this.idCompanyGroup).subscribe((company) => {
      this.apiPhoneNumber$ = company.companyContact;
      this.apiBankAccount$ = company.externalBankAccount;
      this.apiPartnerSource$ = company.companyPartner;
      console.log(this.apiPartnerSource$);
      this.changeDetectorRefs.detectChanges();

      this.loadViewForm();
      this.editValues(company);
    });
  }

  private loadEditForm(company) {
    this.identificationFormGroup = this._formBuilder.group({
      registerTarget: [{ value: 'Estabelecimento', disabled: true }],
      companyResponsibleName: [this.identification?.companyResponsibleName || ''],
      companyResponsible: [this.identification?.companyResponsible || ''],
      companyType: [this.identification?.companyType || ''],
      situation: [this.identification?.situation || ''],
      documentNumberCompany: [this.identification?.documentNumberCompany || ''],
      gpEstablishmentNumber: [this.identification?.gpEstablishmentNumber || ''],
      stateRegistration: [parseInt(this.identification?.stateRegistration) || ''],
      companyName: [this.identification?.companyName || ''],
      fancyName: [this.identification?.fancyName || ''],
      companyShortName: [this.identification?.companyShortName || ''],
      mcccode: [this.identification?.mcccode || 0],
      idDepartament: [this.identification?.idDepartament || ''],
      idCompanyOwner: [''],
      cnae: [this.identification?.cnae || ''],
      idCnae: [this.identification?.idCnae || ''],
      businessActivity: [this.identification?.businessActivity || ''],
      openingDate: [this.identification?.openingDate || ''],
    });
    this.adressFormGroup = this._formBuilder.group({
      streetName: [this.adress?.streetName || ''],
      number: [this.adress?.number || ''],
      complement: [this.adress?.complement || ''],
      neighborhoodName: [this.adress?.neighborhoodName || ''],
      cityName: [this.adress?.cityName || ''],
      uf: [this.adress?.uf || ''],
      responsibleNameCtrl: [this.adress?.responsibleNameCtrl || ''],
      referencePoint: [this.adress?.referencePoint || ''],
      zipCode: [this.adress?.zipCode || ''],
      checkboxAdress: [this.adress?.checkboxAdress || ''],
      subordinateZipCode: [''],
      subordinateNeighborhoodCtrl: [''],
      subordinateCityCtrl: [''],
      subordinateStreetCtrl: [''],
      subordinateNumberCtrl: [''],
      subordinateComplementCtrl: [''],
      subordinateStateCtrl: [''],
      subordinateResponsibleNameCtrl: [''],
      subordinateReferencePointCtrl: [''],
    });
    this.conditionFormGroup = this._formBuilder.group({
      tableSaleCtrl: [this.condition?.tableSaleCtrl || ''],
      automaticCreditIndicator: [this.condition?.automaticCreditIndicator || ''],
      transactionAmount: [this.condition?.transactionAmount || ''],
      tedAmount: [this.condition?.tedAmount || ''],
      referentialTransactionAmount: [this.condition?.referentialTransactionAmount || ''],
      anticipationFee: [this.condition?.anticipationFee || ''],
      ignoreLiberationAJManual: [this.condition?.ignoreLiberationAJManual || ''],
      ajtype: [this.condition?.ajtype || ''],
      beneficiaryType: [this.condition?.beneficiaryType || '',],
      beneficiaryName: [this.condition?.beneficiaryName || ''],
      beneficiaryDocumentNumber: [this.condition?.beneficiaryDocumentNumber || ''],
    });
    this.complementFormGroup = this._formBuilder.group({
      openingHours: [this.complement?.openingHours || ''],
      ecommerceURL: [this.complement?.ecommerceURL || ''],
      estUrl: [this.complement?.estUrl || ''],
      email: [this.complement?.email || ''],
      posQuantity: [parseInt(this.complement?.posQuantity) || ''],
      logicalNumber: [{ value: 0, disabled: true }],
      idTerminal: [this.complement?.idTerminal || ''],
      registerCode: [this.complement?.registerCode || ''],
      registrationDate: [this.complement?.registrationDate || ''],
      gpSendDate: [this.complement?.gpSendDate || ''],
      accreditationDate: [this.complement?.accreditationDate || ''],
      gpAffiliationDate: [this.complement?.gpAffiliationDate || ''],
      seRegistrationDate: [this.complement?.seRegistrationDate || ''],
      discreditationDate: [this.complement?.discreditationDate || '']
    });

    this.companyAdressFormGroup = this._formBuilder.group({
      companyAddress: this._formBuilder.array(company.companyAddress),
    });

    //Contact FormGroup
    this.contactFormGroup = this._formBuilder.group({
      companyContact: this._formBuilder.array(this.apiPhoneNumber$),
    });

    if (this.contactFormGroup.value == []) {
      this.apiPhoneNumber$ = [];
    }

    //Bank FormGroup
    this.bankingFormGroup = this._formBuilder.group({
      externalBankAccount: this._formBuilder.array(this.apiBankAccount$),
    });

    if (this.bankingFormGroup.value == []) {
      this.apiBankAccount$ = [];
    }

    //Partner FormGroup
    this.companyPartnerFormGroup = this._formBuilder.group({
      companyPartner: this._formBuilder.array(this.apiPartnerSource$),
    });

  }
  private loadViewForm() {
    this.identificationFormGroup = this._formBuilder.group({
      registerTarget: [{ value: 'Estabelecimento', disabled: true }],
      companyResponsible: [{ value: this.identification?.companyResponsible || '', disabled: true }],
      companyType: [{ value: this.identification?.companyType || '', disabled: true }],
      situation: [{ value: this.identification?.situation || '', disabled: true }],
      documentNumberCompany: [{ value: this.identification?.documentNumberCompany || '', disabled: true }],
      gpEstablishmentNumber: [{ value: this.identification?.gpEstablishmentNumber || '', disabled: true }],
      stateRegistration: [{ value: this.identification?.stateRegistration || '', disabled: true }],
      companyName: [{ value: this.identification?.companyName || '', disabled: true }],
      fancyName: [{ value: this.identification?.fancyName || '', disabled: true }],
      companyShortName: [{ value: this.identification?.companyShortName || '', disabled: true }],
      mcccode: [{ value: this.identification?.mcccode || '', disabled: true }],
      idDepartament: [{ value: this.identification?.idDepartament || '', disabled: true }],
      cnae: [{ value: this.identification?.cnae || '', disabled: true }],
      idCnae: [{ value: this.identification?.idCnae || '', disabled: true }],
      businessActivity: [{ value: this.identification?.businessActivity || '', disabled: true }],
      openingDate: [{ value: this.identification?.openingDate || '', disabled: true }],
    });
    this.adressFormGroup = this._formBuilder.group({
      streetName: [{ value: this.adress?.streetName || '', disabled: true }],
      number: [{ value: this.adress?.number || '', disabled: true }],
      complement: [{ value: this.adress?.complement || '', disabled: true }],
      neighborhoodName: [{ value: this.adress?.neighborhoodName || '', disabled: true }],
      cityName: [{ value: this.adress?.cityName || '', disabled: true }],
      stateName: [{ value: this.adress?.stateName || '', disabled: true }],
      uf: [{ value: this.adress?.uf || '', disabled: true }],
      responsibleNameCtrl: [{ value: this.adress?.responsibleNameCtrl || '', disabled: true }],
      referencePoint: [{ value: this.adress?.referencePoint || '', disabled: true }],
      zipCode: [{ value: this.adress?.zipCode || '', disabled: true }],
      checkboxAdress: [{ value: this.adress?.checkboxAdress || '', disabled: true }],
      subordinateZipCode: [{ value: '', disabled: true }],
      subordinateNeighborhoodCtrl: [{ value: '', disabled: true }],
      subordinateCityCtrl: [{ value: '', disabled: true }],
      subordinateStreetCtrl: [{ value: '', disabled: true }],
      subordinateNumberCtrl: [{ value: '', disabled: true }],
      subordinateComplementCtrl: [{ value: '', disabled: true }],
      subordinateStateCtrl: [{ value: '', disabled: true }],
      subordinateResponsibleNameCtrl: [{ value: '', disabled: true }],
      subordinateReferencePointCtrl: [{ value: '', disabled: true }],
    });
    this.conditionFormGroup = this._formBuilder.group({
      tableSaleCtrl: [{ value: this.condition?.tableSaleCtrl || '', disabled: true }],
      automaticCreditIndicator: [{ value: this.condition?.automaticCreditIndicator || '', disabled: true }],
      transactionAmount: [{ value: this.condition?.transactionAmount || '', disabled: true }],
      tedAmount: [{ value: this.condition?.tedAmount || '', disabled: true }],
      referentialTransactionAmount: [{ value: this.condition?.referentialTransactionAmount || '', disabled: true }],
      anticipationFee: [{ value: this.condition?.anticipationFee || '', disabled: true }],
      ignoreLiberationAJManual: [{ value: this.condition?.ignoreLiberationAJManual || '', disabled: true }],
      ajtype: [{ value: this.condition?.ajtype || '', disabled: true }],
      beneficiaryType: [{ value: this.condition?.beneficiaryType || '', disabled: true }],
      beneficiaryName: [{ value: this.condition?.beneficiaryName || '', disabled: true }],
      beneficiaryDocumentNumber: [{ value: this.condition?.beneficiaryDocumentNumber || '', disabled: true }],
    });
    this.complementFormGroup = this._formBuilder.group({
      openingHours: [{ value: this.complement?.openingHours || '', disabled: true }],
      ecommerceURL: [{ value: this.complement?.ecommerceURL || '', disabled: true }],
      estUrl: [{ value: this.complement?.estUrl || '', disabled: true }],
      email: [{ value: this.complement?.email || '', disabled: true }],
      posQuantity: [{ value: this.complement?.posQuantity || '', disabled: true }],
      logicalNumber: [{ value: this.complement?.logicalNumber || '', disabled: true }],
      idTerminal: [{ value: this.complement?.idTerminal || '', disabled: true }],
      registerCode: [{ value: this.complement?.registerCode || '', disabled: true }],
      registrationDate: [{ value: this.complement?.registrationDate || '', disabled: true }],
      gpSendDate: [{ value: this.complement?.gpSendDate || '', disabled: true }],
      accreditationDate: [{ value: this.complement?.accreditationDate || '', disabled: true }],
      gpAffiliationDate: [{ value: this.complement?.gpAffiliationDate || '', disabled: true }],
      seRegistrationDate: [{ value: this.complement?.seRegistrationDate || '', disabled: true }],
      discreditationDate: [{ value: this.complement?.discreditationDate || '', disabled: true }],
    });

    this.companyPartnerFormGroup = this._formBuilder.group({
      companyPartner: this._formBuilder.array(this.apiPartnerSource$),
    });
  }

  editValues(company: CompanyContent) {
    this.identificationFormGroup.patchValue({
      companyResponsibleName: company.companyResponsibleName,
      companyType: company.companyType,
      situation: company.situation,
      documentNumberCompany: company.documentNumberCompany,
      gpEstablishmentNumber: company.gpEstablishmentNumber,
      stateRegistration: company.stateRegistration,
      companyName: company.companyName,
      fancyName: company.fancyName,
      companyShortName: company.companyShortName,
      mcccode: company.cnae.mcc.code,
      idDepartament: company.idDepartament,
      cnae: company.cnae,
      idCnae: company.cnae.idCnae,
      businessActivity: company.businessActivity,
      openingDate: company.openingDate
    });


    this.adressFormGroup.patchValue({
      streetName: company.companyAddress[0].street.streetName,
      number: company.companyAddress[0].number,
      complement: company.companyAddress[0].complement,
      neighborhoodName: company.companyAddress[0].street.neighborhood.neighborhoodName,
      cityName: company.companyAddress[0].street.city.cityName,
      uf: company.companyAddress[0].street.state.uf,
      referencePoint: company.referencePoint,
      zipCode: company.companyAddress[0].street.zipCode,
      subordinateZipCode: company.companyAddress[1].street.zipCode,
      subordinateNeighborhoodCtrl: company.companyAddress[1].street.streetName,
      subordinateCityCtrl: company.companyAddress[1].street.city.cityName,
      subordinateStreetCtrl: company.companyAddress[1].street.streetName,
      subordinateNumberCtrl: company.companyAddress[1].number,
      subordinateComplementCtrl: company.companyAddress[1].complement,
      subordinateStateCtrl: company.companyAddress[1].street.state.uf,
      subordinateReferencePointCtrl: company.referencePoint
    });

    console.log(company.companyAddress)

    this.conditionFormGroup.patchValue({
      automaticCreditIndicator: company.automaticCreditIndicator,
      transactionAmount: company.transactionAmount,
      tedAmount: company.tedAmount,
      referentialTransactionAmount: company.referentialTransactionAmount,
      anticipationFee: company.anticipationFee,
      ignoreLiberationAJManual: company.ignoreLiberationAJManual,
      ajtype: company.ajtype,
      beneficiaryType: company.beneficiaryType,
      beneficiaryName: company.beneficiaryName,
      beneficiaryDocumentNumber: company.beneficiaryDocumentNumber
    });

    this.complementFormGroup.patchValue({
      openingHours: company.openingHours,
      ecommerceURL: company.ecommerceURL,
      estUrl: company.estUrl,
      email: company.email,
      posQuantity: company.posQuantity,
      logicalNumber: company.logicalNumber,
      idTerminal: company.idTerminal,
      registerCode: company.registerCode,
      registrationDate: company.registrationDate,
      gpSendDate: company.gpSendDate,
      accreditationDate: company.accreditationDate,
      gpAffiliationDate: company.gpAffiliationDate,
      seRegistrationDate: company.seRegistrationDate,
      discreditationDate: company.discreditationDate
    });

    // console.log(company.externalBankAccount);
    // this.phoneNumber$ = company.companyContact;
    // console.log(this.phoneNumber$);

    if (company.referencePoint == "") {
      this.referencePointNullValue = true;
      console.log(this.referencePointNullValue)
    }

    if (company.accreditationDate == '0000-00-00T00:00:00') {
      this.accreditationDateNullValue = true;
    }

    if (company.gpSendDate == '0000-00-00T00:00:00') {
      this.gpSendDateNullValue = true;
    }

    if (!company.registrationDate) {
      this.registrationDateNullValue = true;
    }

    if (company.gpAffiliationDate == '0000-00-00T00:00:00') {
      this.gpAffiliationDateNullValue = true;
    }

    if (!company.seRegistrationDate) {
      this.seRegistrationDateNullValue = true;
    }

    if (company.discreditationDate == '0000-00-00T00:00:00') {
      this.discreditationDateNullValue = true;
    }
  }

  private loadParams(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.route.params.subscribe((params) => {
        this.id = params['id'];

        if (this.id || this.id == 0) {
          // this.pageType = this.router.url.includes('edit') ? PageTypeEnum.EDIT : PageTypeEnum.VIEW;
          this.pageType = this.router.url.includes('view') ? PageTypeEnum.VIEW : PageTypeEnum.EDIT;
          console.log(this.pageType);
          resolve();
        }
        else {
          this.pageType = PageTypeEnum.ADD;
          resolve();
        }
      });
    });
  }

  isPageEdit(): boolean {
    return this.pageType == PageTypeEnum.EDIT;
  }

  isPageAdd(): boolean {
    return this.pageType == PageTypeEnum.ADD;
  }

  isPageView(): boolean {
    return this.pageType == PageTypeEnum.VIEW;
  }

  createCompany() {

    const form = {
      accreditationDate: this.complementFormGroup.get('accreditationDate').value,
      ajtype: this.conditionFormGroup.get('ajtype').value,
      antecipationTaxPercent: 0,
      anticipationByAssignmentIndicator: true,
      anticipationFee: this.conditionFormGroup.get('anticipationFee').value,
      automaticAnticipationIndicator: "string",
      automaticCreditIndicator: this.conditionFormGroup.get('automaticCreditIndicator').value,
      beneficiaryApartBankAddress: "string",
      beneficiaryDocumentNumber: this.conditionFormGroup.get('beneficiaryDocumentNumber').value,
      beneficiaryName: this.conditionFormGroup.get('beneficiaryName').value,
      beneficiaryOperationType: "string",
      beneficiaryType: this.conditionFormGroup.get('beneficiaryType').value,
      beneficiaryTypeAcount: "string",
      businessActivity: this.identificationFormGroup.get('businessActivity').value,
      companyAddress: [
        {
          complement: this.adressFormGroup.get('complement').value,
          idCompany: 0,
          idCompanyAddress: 0,
          maxDistanceDelivery: "string",
          number: this.adressFormGroup.get('number').value,
          street: {
            city: {
              cityName: this.adressFormGroup.get('cityName').value,
              idCity: 0
            },
            idStreet: 0,
            neighborhood: {
              idNeighborhood: 0,
              neighborhoodName: this.adressFormGroup.get('neighborhoodName').value,
            },
            state: {
              idState: 0,
              uf: this.adressFormGroup.get('uf').value,
            },
            streetName: this.adressFormGroup.get('streetName').value,
            zipCode: this.adressFormGroup.get('zipCode').value,
          },
          type: "Comercial",
        }, {
          complement: this.adressFormGroup.get('subordinateComplementCtrl').value,
          idCompany: 0,
          idCompanyAddress: 0,
          maxDistanceDelivery: "string",
          number: this.adressFormGroup.get('subordinateNumberCtrl').value,
          street: {
            city: {
              cityName: this.adressFormGroup.get('subordinateCityCtrl').value,
              idCity: 0
            },
            idStreet: 0,
            neighborhood: {
              idNeighborhood: 0,
              neighborhoodName: this.adressFormGroup.get('subordinateNeighborhoodCtrl').value,
            },
            state: {
              idState: 0,
              uf: this.adressFormGroup.get('subordinateStateCtrl').value,
            },
            streetName: this.adressFormGroup.get('subordinateStreetCtrl').value,
            zipCode: this.adressFormGroup.get('subordinateZipCode').value,
          },
          type: "Correspondência",
        }
      ],

      companyContact: this.localStorageService.get('phoneNumber'),

      companyLevel: [
        {
          description: "string",
          idCompany: 0,
          idCompanyLevel: 0,
          level: 0
        }
      ],
      companyLevelItem: {
        idCompanyLevel: 1,
        description: "Subadquirente",
        level: 30
      },
      companyName: this.identificationFormGroup.get('companyName').value,
      companyResponsibleName: this.identificationFormGroup.get('companyResponsibleName').value,
      companyShortName: this.identificationFormGroup.get('companyShortName').value,
      companyStatus: 0,
      companyType: this.identificationFormGroup.get('companyType').value,
      discreditationDate: this.complementFormGroup.get('discreditationDate').value,
      documentNumberCompany: this.identificationFormGroup.get('documentNumberCompany').value,
      ecommerceURL: this.complementFormGroup.get('ecommerceURL').value,
      email: this.complementFormGroup.get('email').value,
      equipmentIdentifier: 0,
      estUrl: this.complementFormGroup.get('estUrl').value,
      externalBankAccount: this.localStorageService.get('bankAccount'),
      fancyName: this.identificationFormGroup.get('fancyName').value,
      gpAffiliationDate: this.complementFormGroup.get('gpAffiliationDate').value,
      gpEstablishmentNumber: this.identificationFormGroup.get('gpEstablishmentNumber').value,
      gpReturnDate: "string",
      gpSendDate: this.complementFormGroup.get('gpSendDate').value,
      idCompany: 0,
      companyGroup: {
        idCompany: parseInt(this.idCompanyGroup)
      },
      companyOwner: {
        idCompany: this.identificationFormGroup.get('idCompanyOwner').value,
      },
      idDepartament: this.identificationFormGroup.get('idDepartament').value,
      idPlan: 0,
      idTerminal: this.complementFormGroup.get('idTerminal').value,
      ignoreLiberationAJManual: this.conditionFormGroup.get('ignoreLiberationAJManual').value,
      inclusionRegistrationDateTime: "string",
      logicalNumber: this.complementFormGroup.get('logicalNumber').value,
      mcccode: this.identificationFormGroup.get('mcccode').value,
      openingDate: this.identificationFormGroup.get('openingDate').value,
      openingHours: this.complementFormGroup.get('openingHours').value,
      orderType: 0,
      posBillingTypeRental: "string",
      posChargeAmountRental: 0,
      posPercentageRateValue: 0,
      posQuantity: this.complementFormGroup.get('posQuantity').value,
      recordChangeDateTime: "string",
      referencePoint: this.adressFormGroup.get('referencePoint').value,
      referentialTransactionAmount: this.conditionFormGroup.get('referentialTransactionAmount').value,
      registerCode: this.complementFormGroup.get('registerCode').value,
      registrationDate: this.complementFormGroup.get('registrationDate').value,
      rentalExemptionDays: 0,
      seRegistrationDate: this.complementFormGroup.get('seRegistrationDate').value,
      searchNickname: "string",
      shopping: "string",
      situation: this.identificationFormGroup.get('situation').value,
      stateRegistration: this.identificationFormGroup.get('stateRegistration').value,
      tedAmount: this.conditionFormGroup.get('tedAmount').value,
      tedBillingIdentifier: "string",
      tradingPartnerCode: 0,
      tradingPartnerParticipationPercent: 0,
      transactionAmount: this.conditionFormGroup.get('transactionAmount').value,
      userChangeCode: "string",
      userInclusionCode: "string",
      cnae: {
        code: "string",
        descGroup: "string",
        description: "string",
        idCnae: this.identificationFormGroup.get('idCnae').value,
        mcc: {
          code: "string",
          description: "string",
          idMcc: this.identificationFormGroup.get('mcccode').value
        }
      },
      companyPartner: this.localStorageService.get('partnerFormGroup'),

    }
    console.log(form);

    this.companyService.create(form).subscribe((response: any) => {
      console.log(response);
      this.dataService.openSnackBar('Estabelecimento criado com sucesso', 'X');
      this.router.navigate(['/companies/list'], { queryParams: { idCompanyGroup: this.idCompanyGroup } });
      this.deleteLocalStorage();
    });

  }

  deleteLocalStorage() {
    this.localStorageService.deleteItem('conditionFormGroup');
    this.localStorageService.deleteItem('phoneNumber');
    this.localStorageService.deleteItem('bankAccount');
    this.localStorageService.deleteItem('complementFormGroup');
    this.localStorageService.deleteItem('partnerFormGroup');
    this.localStorageService.deleteItem('identificationFormGroup');
    this.localStorageService.deleteItem('cep');
    this.localStorageService.deleteItem('editPartner');
    this.localStorageService.deleteItem('adressFormGroup');
  }

  getCompanyLevel() {
    this.CompanyByLevelService.getByLevel(this.idCompanyGroup)
      // .pipe(take(1))
      .subscribe((response) => {
        this.optionscompany = response['content'];

        this.identificationFormGroup.get('companyResponsible').valueChanges
          .pipe(
            startWith(''),
          ).subscribe((value) => {
            if (typeof (value) == 'string') {
              this.filteredCompanies = this.optionscompany.filter((company) => {
                return company.companyName.toLowerCase().includes(value.toLowerCase())
              })
            }
          });
      });
  }

  gelAllCnaes() {
    this.cnaeService.getAllCnae()
      // .pipe(take(1))
      .subscribe((data) => {
        //console.log(data.content);
        // this.cnae$ = of(data.content);
        this.optionscnae = data.content;

        this.identificationFormGroup.get('cnae').valueChanges
          .pipe(
            startWith(''),
          ).subscribe((value) => {
            if (typeof (value) == 'string') {
              this.filteredCnaes = this.optionscnae.filter((cnae) => {
                return cnae.description.toLowerCase().includes(value.toLowerCase())
              })
            }
          });
      });
  }

  nextStep() {

    if (this.identificationFormGroup.valid) {
      const selectedCompany = this.identificationFormGroup.get('companyResponsible');
      this.identificationFormGroup.get('idCompanyOwner').setValue(selectedCompany?.value.idCompany);
      this.identificationFormGroup.get('companyResponsibleName').setValue(selectedCompany?.value.companyName);
      this.saveForm(this.identificationFormGroup, 'identificationFormGroup');
      this.checkValueBankAdress(false)
    }
  }

  updateCompany() {
    this.companyService.readById(this.id, this.idCompanyGroup).subscribe((company) => {

      const externalBank = this.bankingFormGroup;
      console.log(externalBank);

      const externalContact = this.contactFormGroup;
      console.log(externalContact);
      const externalAdress = this.companyAdressFormGroup;
      const externalPartner = this.companyPartnerFormGroup;
      console.log(externalAdress);

      const editForm = {
        idCompany: company.idCompany,
        documentNumberCompany: this.identificationFormGroup.get('documentNumberCompany').value,
        accreditationDate: this.complementFormGroup.get('accreditationDate').value,
        ajtype: this.conditionFormGroup.get('ajtype').value,
        antecipationTaxPercent: 0,
        anticipationByAssignmentIndicator: true,
        anticipationFee: this.conditionFormGroup.get('anticipationFee').value,
        automaticAnticipationIndicator: "string",
        automaticCreditIndicator: this.conditionFormGroup.get('automaticCreditIndicator').value,
        beneficiaryApartBankAddress: "string",
        beneficiaryDocumentNumber: this.conditionFormGroup.get('beneficiaryDocumentNumber').value,
        beneficiaryName: this.conditionFormGroup.get('beneficiaryName').value,
        beneficiaryOperationType: "string",
        beneficiaryType: this.conditionFormGroup.get('beneficiaryType').value,
        beneficiaryTypeAcount: "string",
        businessActivity: this.identificationFormGroup.get('businessActivity').value,
        companyContact: this.apiPhoneNumber$,

        // companyLevel: company.companyLevel,

        // companyLevelItem: {
        //   idCompanyLevel: company.companyLevelItem.idCompanyLevel,
        //   description: "Subadquirente",
        //   level: 30
        // },

        companyAddress: externalAdress.value.companyAddress,

        companyName: this.identificationFormGroup.get('companyName').value,
        companyResponsibleName: this.identificationFormGroup.get('companyResponsibleName').value,
        companyShortName: this.identificationFormGroup.get('companyShortName').value,
        companyStatus: company.companyStatus,
        companyType: this.identificationFormGroup.get('companyType').value,
        discreditationDate: this.complementFormGroup.get('discreditationDate').value,
        ecommerceURL: this.complementFormGroup.get('ecommerceURL').value,
        email: this.complementFormGroup.get('email').value,
        equipmentIdentifier: company.equipmentIdentifier,
        estUrl: this.complementFormGroup.get('estUrl').value,
        externalBankAccount: externalBank.value.externalBankAccount,
        fancyName: this.identificationFormGroup.get('fancyName').value,
        gpAffiliationDate: this.complementFormGroup.get('gpAffiliationDate').value,
        gpEstablishmentNumber: this.identificationFormGroup.get('gpEstablishmentNumber').value,
        // gpReturnDate: this.complementFormGroup.get('gpReturnDate').value,
        gpReturnDate: 0,
        gpSendDate: this.complementFormGroup.get('gpSendDate').value,
        idCompanyGroup: company.companyGroup.idCompany,
        // idCompanyOwner: company.companyOwner.idCompany,
        idDepartament: this.identificationFormGroup.get('idDepartament').value,
        idPlan: 0,
        idTerminal: this.complementFormGroup.get('idTerminal').value,
        ignoreLiberationAJManual: this.conditionFormGroup.get('ignoreLiberationAJManual').value,
        inclusionRegistrationDateTime: 0,
        logicalNumber: this.complementFormGroup.get('logicalNumber').value,
        mcccode: this.identificationFormGroup.get('mcccode').value,
        openingDate: this.identificationFormGroup.get('openingDate').value,
        openingHours: this.complementFormGroup.get('openingHours').value,
        orderType: company.orderType,
        posBillingTypeRental: "string",
        posChargeAmountRental: 0,
        posPercentageRateValue: 0,
        posQuantity: this.complementFormGroup.get('posQuantity').value,
        recordChangeDateTime: '',
        referencePoint: this.adressFormGroup.get('referencePoint').value,
        referentialTransactionAmount: this.conditionFormGroup.get('referentialTransactionAmount').value,
        registerCode: this.complementFormGroup.get('registerCode').value,
        registrationDate: this.complementFormGroup.get('registrationDate').value,
        rentalExemptionDays: 0,
        seRegistrationDate: this.complementFormGroup.get('seRegistrationDate').value,
        searchNickname: "string",
        shopping: "string",
        situation: this.identificationFormGroup.get('situation').value,
        stateRegistration: this.identificationFormGroup.get('stateRegistration').value,
        tedAmount: this.conditionFormGroup.get('tedAmount').value,
        tedBillingIdentifier: "string",
        tradingPartnerCode: 0,
        tradingPartnerParticipationPercent: 0,
        transactionAmount: this.conditionFormGroup.get('transactionAmount').value,
        userChangeCode: company.userChangeCode,
        userInclusionCode: company.userInclusionCode,
        cnae: {
          code: "string",
          descGroup: "string",
          description: "string",
          idCnae: company.cnae.idCnae,
          mcc: {
            code: "string",
            description: "string",
            idMcc: company.cnae.mcc.id
          }
        },
        companyPartner: externalPartner.value.companyPartner,
      }
      console.log(editForm);

      this.companyService.update(editForm).subscribe((response: any) => {
        console.log(response);
        this.dataService.openSnackBar('Empresa alterado com sucesso', 'X');
        this.router.navigate(['/companies/list'], { queryParams: { idCompanyGroup: this.idCompanyGroup } });
      });
    })

  }

  //View

  // gelAllCnaes() {
  //   this.cnaeService.getAllCnae()
  //     // .pipe(take(1))
  //     .subscribe((data) => {
  //       //console.log(data.content);
  //       this.cnae$ = of(data.content);

  //       this.filteredCnaes = this.cnaeForm.valueChanges
  //         .pipe(
  //           startWith(''),
  //           map(cnae => this._filterCnaes(cnae))
  //           //map(cnae => cnae ? this._filterCnaes(cnae) : this.cnae$.subscribe(cnaes => {return cnaes.slice()}))
  //         );
  //     });
  // }

  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
    { text: 'CPF / CNPJ', value: 'title' },
    { text: 'Identificação', value: 'nameprofile' },
    { text: 'Tipo', value: 'description' },
    { text: 'Razão Social', value: 'razsoc' },
    { text: 'MCC	', value: 'mcc' },
    { text: 'Parceiro', value: 'parner' },
    // { text: 'Status', value: 'status' },
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
    { text: 'Dígito Agência/Conta', value: 'digit', subValue: null }
  ];

  headersPhoneTable: HeaderModel[] = [
    { text: 'Nome do contato', value: 'contactName' },
    { text: 'Telefone', value: 'companyPhone' }
  ];

  headersPartnerTable: any[] = [
    { text: 'Número Sequência', value: 'partnerSequentialNumber' },
    { text: 'Nome', value: 'partnerName' },
    { text: 'Data de Nascimento', value: 'dateOfBirth', type: 'date' },
    { text: 'CPF', value: 'cpf' },
    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: false,
    view: false
  };

  actionsPartner: ActionModel = {
    add: true,
    edit: true,
    delete: false,
    view: false
  };

  viewActions: ActionModel = {
    add: false,
    edit: false,
    delete: false,
    view: false
  }

  //Add Methods
  onAddPhone(idPhone: number) {
    const dialogRef = this.dialog.open(AddPhoneComponent, {
      data: { id: idPhone },
    });
    dialogRef.afterClosed().subscribe((item) => {
      // this.phoneNumber$ = this.localStorageService.get('phoneNumber');
      this.phoneNumber$.push(item.value);
      this.apiPhoneNumber$.push(item.value);
      this.phoneNumber$ = [...this.phoneNumber$];
      this.apiPhoneNumber$ = [...this.apiPhoneNumber$]
      this.phoneService.refreshDataTable();
    })
  }

  onAddBankAccount(idBankAccount: number) {
    const dialogRef = this.dialog.open(AddBankAccountComponent, {
      data: { id: idBankAccount },
    });
    dialogRef.afterClosed().subscribe((item) => {
      this.bankAccount$.push(item.value);
      this.apiBankAccount$.push(item.value);
      this.bankAccount$ = [...this.bankAccount$];
      this.apiBankAccount$ = [...this.apiBankAccount$];
      this.phoneService.refreshDataTable();
    })
  }

  onAddPartnerPage(index: number) {
    if (this.isPageAdd()) {
      this.router.navigate(['/companies/partners/add']);
    } else {
      this.router.navigate([`partners/api-add/`], { relativeTo: this.route })
    }
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
    const localIndex = this.bankAccount$.indexOf(row)
    const apiIndex = this.apiBankAccount$.indexOf(row)
    console.log(apiIndex);
    const dialogRef = this.dialog.open(EditBankAccountComponent, {
      data: { localIndex, apiIndex }
    });
    dialogRef.afterClosed().subscribe((item) => {
      Object.assign(this.bankAccount$, item);;
      this.phoneService.refreshDataTable();
    })
  }

  onEditPartner(row: object) {
    const localIndex = this.partnerSource$.findIndex((c) => c == row);
    const apiIndex = this.apiPartnerSource$.findIndex((c) => c == row);

    if (this.isPageAdd()) {
      this.router.navigate([`/companies/partners/local-edit/${localIndex}`]);
    } else {
      this.router.navigate([`partners/api-edit/${apiIndex}`, this.id], { relativeTo: this.route })
    }
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
    this.router.navigate(["/companies/list"], { queryParams: { idCompanyGroup: this.idCompanyGroup } })
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

  getErrorMessageNullValue() {
    console.log('Esse campo não foi cadastrado')
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

  displayFnCompany = (item): string => {
    if (item) {
      return item.companyName;
    } else {
      return '';
    }
  }

  getMccByCnae() {
    let a = this.mcc
    let obj = {
      mcccode: a.mcc.code,
      idCnae: a.idCnae
    }
    this.identificationFormGroup.patchValue(obj);
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

    if (this.isPageEdit() || this.isPageView()) {
      this.companyService.readById(this.id, this.idCompanyGroup).subscribe((company) => {

        if (this.adressFormGroup.get('zipCode').value.length != 8) {
          const message = 'Por favor, verifique novamente o CEP registrado acima.';

          this._generalService.openOkDialog(message, () => { }, 'CEP inválido');
        } else {
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
      })
    } else {
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

  }
  onSelectionChanged(value) {
    let a = value.checked;
    if (a === true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }
  CheckCompany(value) {
    let a = value.checked;
    if (a === true) {
      this.isCheckedSituation = true;
    } else {
      this.isCheckedSituation = false;
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

  saveAdress() {
    let obj = {
      companyAddress: [{
        complement: this.adressFormGroup.get('complement').value,
        maxDistanceDelivery: "string",
        number: this.adressFormGroup.get('number').value,
        street: {
          city: {
            cityName: this.adressFormGroup.get('cityName').value,
          },
          idStreet: 0,
          neighborhood: {
            neighborhoodName: this.adressFormGroup.get('neighborhoodName').value,
          },
          state: {
            uf: this.adressFormGroup.get('uf').value,
          },
          streetName: this.adressFormGroup.get('streetName').value,
          zipCode: this.adressFormGroup.get('zipCode').value,
        },
        type: "Comercial",
      }, {
        complement: this.adressFormGroup.get('subordinateComplementCtrl').value,
        maxDistanceDelivery: "string",
        number: this.adressFormGroup.get('subordinateNumberCtrl').value,
        street: {
          city: {
            cityName: this.adressFormGroup.get('subordinateCityCtrl').value,
          },
          idStreet: 0,
          neighborhood: {
            neighborhoodName: this.adressFormGroup.get('subordinateNeighborhoodCtrl').value,
          },
          state: {
            uf: this.adressFormGroup.get('subordinateStateCtrl').value,
          },
          streetName: this.adressFormGroup.get('subordinateStreetCtrl').value,
          zipCode: this.adressFormGroup.get('subordinateZipCode').value,
        },
        type: "Correspondência",
      }]
    };

    this.endereco = Object.assign({}, obj);
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

  }

}
