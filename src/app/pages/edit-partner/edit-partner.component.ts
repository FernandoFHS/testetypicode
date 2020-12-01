import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { CepService } from 'src/app/services/cep.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss'],
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
export class EditPartnerComponent implements OnInit {

  partnerFormGroup: FormGroup;

  partnerSource: any = this.localStorageService.get('partnerFormGroup');
  partnerSourceEdit: any = this.localStorageService.get('editPartner');
  cep: number;
  response;
  partnerArray: any;
  partner: any;
  index: any;

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Sócio',
      route: 'add-partner'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Estabelecimentos', route: 'company-list' },
      { title: 'Incluir Estabelecimento', route: 'company-list/add-company' },
    ]
  }

  constructor(

    private _formBuilder: FormBuilder,
    private CepService: CepService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadParams().then(() => {
      this.partnerFormGroup = new FormGroup({
        cpf: new FormControl(this.partner?.cpf ||''),
        dateOfBirth: new FormControl(this.partner?.dateOfBirth ||''),
        cityName: new FormControl(this.partner?.cityName ||''),
        neighborhoodName: new FormControl(this.partner?.neighborhoodName ||''),
        stateName: new FormControl(this.partner?.stateName ||''),
        streetName: new FormControl(this.partner?.streetName ||''),
        complement: new FormControl(this.partner?.complement ||''),
        number: new FormControl(this.partner?.number ||''),
        phone: new FormControl(this.partner?.phone ||''),
        zipCode: new FormControl(this.partner?.zipCode ||''),
        partnerName: new FormControl(this.partner?.partnerName ||''),
        partnerSequentialNumber: new FormControl(this.partner?.partnerSequentialNumber ||''),
      })
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

  loadParams(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.activatedRoute.params.subscribe((params) => {
          const index = params['index'];

          if (typeof (index) == 'string') {

            const partnerArray = this.localStorageService.get('editPartner');

            if (partnerArray && partnerArray.length > 0) {
              const partner = partnerArray[index];
              this.partner = partner;
              this.index = index;

              resolve();
            } else {
              // TODO - Redireiconar usuario para ? informando que o Sócio não foi encontrado
              reject();
            }
          }
        });
      }
      catch (error) {
        // TODO - Redirecionar usuario para lista informadno que houve um erro ao carregar o Sócio
        reject();
      }

    });
  }


  editPartner() {
    let index = this.index;

    let editable = {
      cpf: this.partnerFormGroup.get('cpf').value,
      dateOfBirth: this.partnerFormGroup.get('dateOfBirth').value,
      cityName: this.partnerFormGroup.get('cityName').value,
      neighborhoodName: this.partnerFormGroup.get('neighborhoodName').value,
      stateName: this.partnerFormGroup.get('stateName').value,
      streetName: this.partnerFormGroup.get('streetName').value,
      complement: this.partnerFormGroup.get('complement').value,
      number: this.partnerFormGroup.get('number').value,
      phone: parseInt(this.partnerFormGroup.get('phone').value),
      zipCode: this.partnerFormGroup.get('zipCode').value,
      partnerName: this.partnerFormGroup.get('partnerName').value,
      partnerSequentialNumber: 1,
    }

    let editableItem =  {
      cpf : this.partnerFormGroup.get('cpf').value,
      dateOfBirth: this.partnerFormGroup.get('dateOfBirth').value,
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
      partnerSequentialNumber: 1,
      
    }

    if (index > -1) {
      Object.assign(this.partnerSourceEdit[index], editable);
      localStorage.setItem('editPartner', JSON.stringify(this.partnerSourceEdit));
    } else {
      console.log(editable);
    }

    if (index > -1) {
      Object.assign(this.partnerSource[index], editableItem);
      localStorage.setItem('partnerFormGroup', JSON.stringify(this.partnerSource));
    } else {
      console.log(editableItem);
    }
    this.router.navigate(['/company-list/add-company']);
  }


  onNoClick(): void {
    this.router.navigate(['/company-list/add-company']);
  }

  getAdressByCep(value) {
    this.cep = value;
    console.log(this.cep);
    this.CepService.getCep(this.cep).subscribe((response: any) => {
      console.log(response);

      let obj = {
        cityName: response.localidade,
        streetName: response.logradouro,
        neighborhoodName: response.bairro,
        stateName: response.uf,
      };
      this.response = response;
      this.partnerFormGroup.patchValue(obj);
    });
  }



}
