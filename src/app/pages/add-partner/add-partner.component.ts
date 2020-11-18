import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CepService } from 'src/app/services/cep.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss'],
})
export class AddPartnerComponent implements OnInit {

  teste;
  partnerArray: any[];

  partnerFormGroup: FormGroup;

  street: FormGroup;

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
    this.partnerFormGroup = this._formBuilder.group({
      partnerSequentialNumber: [{ value: '', disabled: true }, Validators.required],
      partnerName: ['', Validators.required],
      cpf: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      // cep: ['', Validators.required],
      // street: ['', Validators.required],
      // number: ['', Validators.required],
      // complement: [''],
      // neighborhood: ['', Validators.required],
      // county: ['', Validators.required],
      // state: ['', Validators.required],

      partnerAddress: this._formBuilder.array([
          this._formBuilder.group({
            number:[''],
            complement: [''],

            // this._formBuilder.group({
            //   streetName:[''],
            //   zipCode:[''],
            // })
      


          }),   
      ]),

      partnerContact: this._formBuilder.array([
        this._formBuilder.group({
          phone:[''],
        })
      ]),
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
  }

  getAdressByCep(value) {
    this.CepService.getCep(value).subscribe((response: any) => {
      console.log(response);

      let obj = {
        county: response.localidade,
        street: response.logradouro,
        neighborhood: response.bairro,
        state: response.uf,
      };
      this.teste = response;
      this.partnerFormGroup.patchValue(obj);
      console.log(this.partnerFormGroup);
    });
  }

  savePartner(form) {
    let partnerArray = this.localStorageService.get('partnerFormGroup');
    if (!partnerArray) {
      partnerArray = [];
    }
    partnerArray.push(form.value);
    this.localStorageService.set('partnerFormGroup', partnerArray);
    this.router.navigate(['/company-list/add-company']);
  }

}