import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  cep: number;
  teste;
  partnerArray: any[];
  partnerArrayEdit: any[];			  

  partnerSource: any = this.localStorageService.get('partnerFormGroup');
  partnerSourceEdit: any = this.localStorageService.get('editPartner');
  response;
  partner: any;
  index: any;
  addPage: boolean;

  partnerFormGroup: FormGroup;

  addBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Sócio',
      route: 'add'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Estabelecimentos', route: 'companies/list' },
      { title: 'Incluir Estabelecimento', route: 'companies/add' },
    ]
  };

  editBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Sócio',
      route: 'edit'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Estabelecimentos', route: 'list' },
      { title: 'Incluir Estabelecimento', route: 'companies/add' },
    ]
  };

  constructor(
    private _formBuilder: FormBuilder,
    public dataService: DataService,
    private CepService: CepService,
    private router: Router,
    public _snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadParams().then(() => {
      this.partnerFormGroup = this._formBuilder.group({
        partnerSequentialNumber: [{ value: '', disabled: true }, Validators.required],
        partnerName: [this.partner?.partnerName || '', Validators.required],
        cpf: [this.partner?.cpf || '', Validators.required],
        dateOfBirth: [this.partner?.dateOfBirth || '', Validators.required],
        zipCode: [this.partner?.zipCode || '', Validators.required],
        streetName: [this.partner?.streetName || '', Validators.required],
        number: [this.partner?.number || '', Validators.required],
        complement: [this.partner?.complement || ''],
        neighborhoodName: [this.partner?.neighborhoodName || '', Validators.required],
        cityName: [this.partner?.cityName || '', Validators.required],
        stateName: [this.partner?.stateName || '', Validators.required],
        phone: [this.partner?.phone || '', Validators.required]
      });
    });

    if (!this.index) {
      this.addPage = true;
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
    } else {
      this.addPage = false;
    }
    console.log(this.addPage);
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
    this.router.navigate(['/companies/add']);
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

    this.router.navigate(['/companies/add']);
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
    this.router.navigate(['/companies/add']);
  }

}