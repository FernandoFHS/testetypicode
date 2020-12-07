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
      { title: 'Lista de Estabelecimentos', route: 'companies/list' },
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
    // this.loadParams().then(() => {
    //   this.partnerFormGroup = this._formBuilder.group({
    //     partnerSequentialNumber: [{ value: '', disabled: true }, Validators.required],
    //     partnerName: [this.partner?.partnerName || '', Validators.required],
    //     cpf: [this.partner?.cpf || '', Validators.required],
    //     dateOfBirth: [this.partner?.dateOfBirth || '', Validators.required],
    //     zipCode: [this.partner?.zipCode || '', Validators.required],
    //     streetName: [this.partner?.streetName || '', Validators.required],
    //     number: [this.partner?.number || '', Validators.required],
    //     complement: [this.partner?.complement || ''],
    //     neighborhoodName: [this.partner?.neighborhoodName || '', Validators.required],
    //     cityName: [this.partner?.cityName || '', Validators.required],
    //     uf: [this.partner?.uf || '', Validators.required],
    //     phone: [this.partner?.phone || '', Validators.required]
    //   });
    // });

    this.loadParams().then(() => {
      this.partnerFormGroup =new FormGroup({
        partnerSequentialNumber:new FormControl({ value: '', disabled: true },Validators.required),
        partnerName:new FormControl(this.partner?.partnerName || '', Validators.required),
        cpf:new FormControl(this.partner?.cpf || '', Validators.required),
        dateOfBirth:new FormControl(this.partner?.dateOfBirth || '', Validators.required),
        zipCode:new FormControl(this.partner?.zipCode || '', Validators.required),
        streetName:new FormControl(this.partner?.streetName || '', Validators.required),
        number:new FormControl(this.partner?.number || '', Validators.required),
        complement:new FormControl(this.partner?.complement || '', Validators.required),
        neighborhoodName:new FormControl(this.partner?.neighborhoodName || '', Validators.required),
        cityName:new FormControl(this.partner?.cityName || '', Validators.required),
        uf:new FormControl(this.partner?.uf || '', Validators.required),
        phone:new FormControl(this.partner?.phone || '', Validators.required),
      });
    });


    if (!this.index) {
      this.addPage = true;
      this.partnerFormGroup = new FormGroup({
      cpf: new FormControl(''),
      dateOfBirth: new FormControl(''),
      cityName: new FormControl(''),
      neighborhoodName: new FormControl(''),
      uf: new FormControl(''),
      streetName: new FormControl(''),
      complement: new FormControl(''),
      number: new FormControl(''),
      phone: new FormControl(''),
      zipCode: new FormControl(''),
      partnerName: new FormControl(''),
      partnerSequentialNumber: new FormControl({ value: '', disabled: true }),
		 
    });
    } else {
      this.addPage = false;
    }
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  // getErrorMessage() {
  //   return this.formControl.hasError('required')
  //     ? 'Campo Obrigatório'
  //     : this.formControl.hasError('email')
  //       ? 'Not a valid email'
  //       : '';
  // }
  getErrorMessage(controlName: string) {
    const control = this.partnerFormGroup.get(controlName);
    return control.hasError('required')
      ? 'Campo Obrigatório'
      : control.hasError('email')
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
          console.log(index);
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
        uf: response.uf,
      };
      this.teste = response;
      this.partnerFormGroup.patchValue(obj);
      console.log(this.partnerFormGroup);
    });
  }

  savePartner(form) {
    // const form1  = this.partnerFormGroup.getRawValue();
    this.partner =  {
      cpf : parseInt(this.partnerFormGroup.get('cpf').value),
      dateOfBirth: this.partnerFormGroup.get('dateOfBirth').value,
      partnerAddress:[{
        complement:this.partnerFormGroup.get('complement').value,
        idCompanyPartner: 0,
        idPartnerAddress: 0,
        number:this.partnerFormGroup.get('number').value,
        street:{
          city:{
            cityName: this.partnerFormGroup.get('cityName').value,
          },
          idStreet: 0,
          neighborhood:{
            neighborhoodName:this.partnerFormGroup.get('neighborhoodName').value,
          },
          state:{
             uf: this.partnerFormGroup.get('uf').value
          },
          streetName: this.partnerFormGroup.get('streetName').value,
          zipCode: this.partnerFormGroup.get('zipCode').value,
        }
      }],
      partnerContact: [
        {
          phone: this.partnerFormGroup.get('phone').value,
        }
      ],
      partnerName: this.partnerFormGroup.get('partnerName').value,
      partnerSequentialNumber: 0,
      
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
      cpf: parseInt(this.partnerFormGroup.get('cpf').value),
      dateOfBirth: this.partnerFormGroup.get('dateOfBirth').value,
      cityName: this.partnerFormGroup.get('cityName').value,
      neighborhoodName: this.partnerFormGroup.get('neighborhoodName').value,
      uf: this.partnerFormGroup.get('uf').value,
      streetName: this.partnerFormGroup.get('streetName').value,
      complement: this.partnerFormGroup.get('complement').value,
      number: this.partnerFormGroup.get('number').value,
      phone: this.partnerFormGroup.get('phone').value,
      zipCode: this.partnerFormGroup.get('zipCode').value,
      partnerName: this.partnerFormGroup.get('partnerName').value,
      partnerSequentialNumber: 1,
    }

    let editableItem =  {
      cpf : parseInt(this.partnerFormGroup.get('cpf').value),
      dateOfBirth: this.partnerFormGroup.get('dateOfBirth').value,
      partnerAddress:[{
        complement:this.partnerFormGroup.get('complement').value,
        idCompanyPartner: 0,
        idPartnerAddress: 0,
        number:this.partnerFormGroup.get('number').value,
        street:{
          city:{
            cityName: this.partnerFormGroup.get('cityName').value,
          },
          idStreet: 0,
          neighborhood:{
            neighborhoodName:this.partnerFormGroup.get('neighborhoodName').value,
          },
          state:{
             uf: this.partnerFormGroup.get('uf').value
          },
          streetName: this.partnerFormGroup.get('streetName').value,
          zipCode: this.partnerFormGroup.get('zipCode').value,
        }
      }],
      partnerContact: [
        {
          phone: this.partnerFormGroup.get('phone').value,
        }
      ],
      partnerName: this.partnerFormGroup.get('partnerName').value,
      partnerSequentialNumber: 0,
      
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
    this.router.navigate(['/companies/edit/']);
  }

 

}