import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss'],
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
export class AddPartnerComponent implements OnInit {

  teste;
  partnerArray: any[];
  partnerArrayEdit: any[];

  partnerFormGroup: FormGroup;
  partner;


  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Sócio',
      route: 'add-partner'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Estabelecimentos', route: 'company-list' },
      { title: 'Incluir Estabelecimento', route: 'company-list/add-company' },
    ]
  };

  constructor(
    private _formBuilder: FormBuilder,
    public dataService: DataService,
    private CepService: CepService,
    private router: Router,
    public _snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {

    this.partnerFormGroup = new FormGroup({
      cpf: new FormControl(''),
      dateOfBirth: new FormControl(''),
      cityName: new FormControl(''),
      neighborhoodName: new FormControl(''),
      stateName: new FormControl(''),
      streetName: new FormControl(''),
      complement: new FormControl(''),
      number: new FormControl(''),
      phone: new FormControl(''),
      zipCode: new FormControl(''),
      partnerName: new FormControl(''),
      partnerSequentialNumber: new FormControl(''),
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

  onNoClick(): void {
    this.router.navigate(['/company-list/add-company']);
    console.log(this.partnerFormGroup);
  }

  getAdressByCep(value) {
    this.CepService.getCep(value).subscribe((response: any) => {
      console.log(response);

      let obj = {
        cityName: response.localidade,
        streetName: response.logradouro,
        neighborhoodName: response.bairro,
        stateName: response.uf,
      };
      this.teste = response;
      this.partnerFormGroup.patchValue(obj);
      console.log(this.partnerFormGroup);
    });
  }

  savePartner(form) {
    const form1  = this.partnerFormGroup.getRawValue();
    this.partner =  {
      cpf : form1.cpf,
      dateOfBirth: "2020-11-19T19:21:08.349Z",
      partnerName: this.partnerFormGroup.get('partnerName').value,
      partnerAddress:[{
        complement:this.partnerFormGroup.get('complement').value,
        number:this.partnerFormGroup.get('number').value,
        street:{
          city:{
            cityName: this.partnerFormGroup.get('cityName').value,
          },
          neighborhood:{
            neighborhoodName:this.partnerFormGroup.get('neighborhoodName').value,
          },
          state:{
            stateName:this.partnerFormGroup.get('stateName').value.toLowerCase(),
            uf: this.partnerFormGroup.get('stateName').value.toLowerCase()
          },
          streetName: this.partnerFormGroup.get('streetName').value,
          zipCode: this.partnerFormGroup.get('zipCode').value,
        }
      }],
      partnerContact: [
        {
          phone: parseInt(this.partnerFormGroup.get('phone').value),
        }
      ],
      partnerSequentialNumber: 1
      
    }
    console.log(this.partner);

    let partnerArrayEdit = this.localStorageService.get('editPartner');
    if (!partnerArrayEdit) {
      partnerArrayEdit = [];
    }

    let partnerArray = this.localStorageService.get('partnerFormGroup');
    if (!partnerArray) {
      partnerArray = [];
    }
    partnerArrayEdit.push(form.value);
    this.localStorageService.set('editPartner', partnerArrayEdit);

    partnerArray.push(this.partner);
    this.localStorageService.set('partnerFormGroup', partnerArray);

    this.router.navigate(['/company-list/add-company']);
  }

}