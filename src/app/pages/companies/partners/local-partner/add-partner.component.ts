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
import { NotificationService } from 'src/app/services/notification.service';
import { PartnerService } from 'src/app/services/partner.service';
import {Location} from '@angular/common';

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
  idPartner: any;
  idCompany: any;
  idPartnerEditPage: any;

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
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private partnerService: PartnerService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.idCompany = +this.activatedRoute.snapshot.paramMap.get('id');
    this.idPartner = +this.activatedRoute.snapshot.paramMap.get('index');
    console.log(this.idPartner)

    if (this.router.url.includes('local-edit')) {
      this.addPage = false;
      this.loadEditForm();
      if (this.partnerSource != undefined) {
        this.getLocalStorage('partnerFormGroup');
      }
    } else {
      this.addPage = true;
      this.loadAddForm();
    }
  }

  loadAddForm() {
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
    partnerSequentialNumber: new FormControl({ value: 0, disabled: true }),
    })
  }

  loadEditForm() {
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
      partnerSequentialNumber: new FormControl({ value: 0, disabled: true }),
      })
  }

  formControl = new FormControl('', [
    Validators.required,
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
    this.router.navigate(['/companies/add']);
  }

  getLocalStorage(item) {
    if (item == 'partnerFormGroup') {
      let localStorage = {
        cpf: this.partnerSource[this.idPartner].cpf,
        dateOfBirth: this.partnerSource[this.idPartner].dateOfBirth,
        cityName: this.partnerSource[this.idPartner].cityName,
        neighborhoodName: this.partnerSource[this.idPartner].neighborhoodName,
        uf: this.partnerSource[this.idPartner].uf,
        streetName: this.partnerSource[this.idPartner].streetName,
        complement: this.partnerSource[this.idPartner].complement,
        number: this.partnerSource[this.idPartner].number,
        phone: this.partnerSource[this.idPartner].phone,
        zipCode: this.partnerSource[this.idPartner].zipCode,
        partnerName: this.partnerSource[this.idPartner].partnerName,
        partnerSequentialNumber: this.partnerSource[this.idPartner].partnerSequentialNumber,
      };
      this.partnerFormGroup.patchValue(localStorage);
      console.log(localStorage);
    }
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

    partnerArrayEdit.push(this.partner);
    this.localStorageService.set('partnerFormGroup', partnerArrayEdit);
    console.log(partnerArrayEdit);
    this.partnerService.addPartner(this.partner);
    this.notificationService.success('Sócio adicionado com sucesso');
    this.location.back();
    this.partnerService.backCompany()

    // if (this.idPartner > -1) {
    //   Object.assign(this.partnerSource[idPartner], editableItem);
    //   localStorage.setItem('partnerFormGroup', JSON.stringify(this.partnerSource));
    //   this.partnerService.editPartner({partner: editableItem, index: idPartner});
    //   this.notificationService.success('Sócio editado com sucesso');
    //   this.location.back();
    //   this.partnerService.backCompany()
    //   console.log(this.partnerSource[idPartner]);
    // } else {
    //   console.log(editableItem);
    // }
  }

  editPartner() {
    let index = this.index;
    let idPartner = +this.activatedRoute.snapshot.paramMap.get('index');
    console.log(idPartner);

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
    console.log(this.partnerSource)

    if (this.idPartner > -1) {
      Object.assign(this.partnerSource[idPartner], editableItem);
      localStorage.setItem('partnerFormGroup', JSON.stringify(this.partnerSource));
      this.partnerService.editPartner({partner: editableItem, index: idPartner});
      this.notificationService.success('Sócio editado com sucesso');
      this.location.back();
      this.partnerService.backCompany()
      console.log(this.partnerSource[idPartner]);
    } else {
      console.log(editableItem);
    }
  }

 

}