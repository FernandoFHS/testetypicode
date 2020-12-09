import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CepService } from 'src/app/services/cep.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
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
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-dinamic-partner',
  templateUrl: './dinamic-partner.html',
  styleUrls: ['./dinamic-partner.scss'],
  providers: [
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
export class EditApiDataComponent implements OnInit {
  cep: number;
  teste;
  partnerArray: any[];
  partnerArrayEdit: any[];
  idCompany: number;
  idPartner: number;
  idCompanyGroup:number;

  apiPartnerSource$: any;
  partnerSourceEdit: any = this.localStorageService.get('editPartner');
  response;
  partner: any;
  index: any;
  isAddPage: boolean;

  partnerFormGroup: FormGroup;

  addBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Sócio',
      route: 'add',
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Estabelecimentos', route: 'companies/list' },
      { title: 'Incluir Estabelecimento', route: 'companies/add' },
    ],
  };

  editBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Sócio',
      route: 'edit',
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Estabelecimentos', route: 'companies/list' },
      { title: 'Incluir Estabelecimento', route: 'companies/add' },
    ],
  };

  constructor(
    private _formBuilder: FormBuilder,
    public dataService: DataService,
    private CepService: CepService,
    private router: Router,
    public _snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private notificationService: NotificationService,
    private partnerService: PartnerService,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.idCompany = +this.activatedRoute.snapshot.paramMap.get('id');
    this.idPartner = +this.activatedRoute.snapshot.paramMap.get('index');
    this.idCompanyGroup =this.localStorageService.get('idCompanyGroup');

      if (this.idPartner || this.idPartner == 0 && this.idCompany) {
        this.isAddPage = false;
        this.loadEditForm();
      } else {
        this.isAddPage = true;
        this.loadAddForm();
      }
  }

  loadEditForm() {
    const companies = this.partnerService.getPartners();
    const companyPartner = companies[this.idPartner];

      this.partnerFormGroup = this._formBuilder.group({
        partnerSequentialNumber: [companyPartner.partnerSequentialNumber || 0],
        partnerName: [companyPartner.partnerName || ''],
        cpf: [companyPartner.cpf || ''],
        dateOfBirth: [companyPartner.dateOfBirth ||''],
        zipCode: [companyPartner.partnerAddress[0].street.zipCode || ''],
        streetName: [companyPartner.partnerAddress[0].street.streetName || ''],
        number: [companyPartner.partnerAddress[0].number || ''],
        complement: [companyPartner.partnerAddress[0].complement || ''],
        neighborhoodName: [companyPartner.partnerAddress[0].street.neighborhood.neighborhoodName || ''],
        cityName: [companyPartner.partnerAddress[0].street.city.cityName || ''],
        uf: [companyPartner.partnerAddress[0].street.state.uf || ''],
        phone: [companyPartner.partnerContact[0].phone || '']
      });
  }

  loadAddForm() {
    this.partnerFormGroup = this._formBuilder.group({
      partnerSequentialNumber: ['', Validators.required],
      partnerName: ['', Validators.required],
      cpf: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      zipCode: ['', Validators.required],
      streetName: ['', Validators.required],
      number: ['', Validators.required],
      complement: ['', Validators.required],
      neighborhoodName: ['', Validators.required],
      cityName: ['', Validators.required],
      uf: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage(controlName: string) {
    const control = this.partnerFormGroup.get(controlName);
    return control.hasError('required')
      ? 'Campo Obrigatório'
      : control.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onNoClick(): void {
    this.location.back();
    this.partnerService.backCompany();
  }

  getAdressByCep(value) {
    this.CepService.getCep(value).subscribe((response: any) => {
      console.log(response);

      let obj = {
        cityName: response.localidade,
        streetName: response.logradouro,
        neighborhoodName: response.bairro,
        uf: response.uf,
      };
      this.teste = response;
      this.partnerFormGroup.patchValue(obj);
      console.log(this.partnerFormGroup);
    });
  }

  savePartner() {
    // const form1  = this.partnerFormGroup.getRawValue();
    this.partner = {
      cpf: parseInt(this.partnerFormGroup.get('cpf').value),
      dateOfBirth: this.partnerFormGroup.get('dateOfBirth').value,
      partnerAddress: [
        {
          complement: this.partnerFormGroup.get('complement').value,
          idCompanyPartner: 0,
          idPartnerAddress: 0,
          number: this.partnerFormGroup.get('number').value,
          street: {
            city: {
              cityName: this.partnerFormGroup.get('cityName').value,
            },
            idStreet: 0,
            neighborhood: {
              neighborhoodName: this.partnerFormGroup.get('neighborhoodName')
                .value,
            },
            state: {
              uf: this.partnerFormGroup.get('uf').value,
            },
            streetName: this.partnerFormGroup.get('streetName').value,
            zipCode: this.partnerFormGroup.get('zipCode').value,
          },
        },
      ],
      partnerContact: [
        {
          phone: this.partnerFormGroup.get('phone').value,
        },
      ],
      partnerName: this.partnerFormGroup.get('partnerName').value,
      partnerSequentialNumber: 0,
    };
    console.log(this.partner);

    this.partnerService.addPartner(this.partner);
    this.notificationService.success('Sócio adicionado com sucesso');
    this.location.back();
    this.partnerService.backCompany()
  }

  editPartner() {
    let idPartner = +this.activatedRoute.snapshot.paramMap.get('index');
    
    this.companyService.readById(this.idCompany,this.idCompanyGroup).subscribe((company) => {
      this.apiPartnerSource$ = company.companyPartner;

      let editableItem = {
        cpf: parseInt(this.partnerFormGroup.get('cpf').value),
        dateOfBirth: this.partnerFormGroup.get('dateOfBirth').value,
        partnerAddress: [
          {
            complement: this.partnerFormGroup.get('complement').value,
            idCompanyPartner: 0,
            idPartnerAddress: 0,
            number: this.partnerFormGroup.get('number').value,
            street: {
              city: {
                cityName: this.partnerFormGroup.get('cityName').value,
              },
              idStreet: 0,
              neighborhood: {
                neighborhoodName: this.partnerFormGroup.get('neighborhoodName')
                  .value,
              },
              state: {
                uf: this.partnerFormGroup.get('uf').value,
              },
              streetName: this.partnerFormGroup.get('streetName').value,
              zipCode: this.partnerFormGroup.get('zipCode').value,
            },
          },
        ],
        partnerContact: [
          {
            phone: this.partnerFormGroup.get('phone').value,
          },
        ],
        partnerName: this.partnerFormGroup.get('partnerName').value,
        partnerSequentialNumber: 0,
      };
  
      if (idPartner > -1) {
        Object.assign(this.apiPartnerSource$[idPartner], editableItem);
      } else {
        console.log(editableItem);
      }
      this.partnerService.editPartner({partner: editableItem, index: idPartner});
      this.notificationService.success('Sócio editado com sucesso');;
      this.location.back();
      this.partnerService.backCompany()
    })
  }
}
