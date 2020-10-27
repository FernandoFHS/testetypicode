import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Content, Profile } from 'src/app/models/profile';
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
import { CepService } from 'src/app/services/cep.service';

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

  profile: Content = {
    idProfile: null,
    nameProfile: '',
    description: ''
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  partnerFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dataService: DataService,
    private CepService: CepService,
    private router: Router,
    public _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.partnerFormGroup = this._formBuilder.group({
      sequenceNumber: [{value: '', disabled: true}, Validators.required],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cep: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: ['', Validators.required],
      neighborhood: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  createProfile(): void {
    this.dataService.create(this.profile).subscribe(() => {
      this.dataService.openSnackBar('Perfil adicionado com sucesso!', 'X')
      this.router.navigate(['/profile-list'])
    })
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    // emppty stuff
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
        countyCtrl: response.localidade,
        streetCtrl: response.logradouro,
        neighborhoodCtrl: response.bairro,
        stateCtrl: response.uf,
      };
      this.teste = response;
      this.partnerFormGroup.patchValue(obj);
      console.log(this.partnerFormGroup);
    });
  }

  //confirmAdd(): void {
  //  this.dataService.addProfile(this.data);
  //}

}


