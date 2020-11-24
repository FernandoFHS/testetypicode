import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  cep: number;
  teste;
  partnerArray: any[];

  partnerSource: any = this.localStorageService.get('partnerFormGroup');
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
      { title: 'Lista de Estabelecimentos', route: 'company-list' },
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
        sequenceNumber: [{ value: '', disabled: true }, Validators.required],
        name: [this.partner?.name || '', Validators.required],
        cpf: [this.partner?.cpf || '', Validators.required],
        dateOfBirth: [this.partner?.dateOfBirth || '', Validators.required],
        cep: [this.partner?.cep || '', Validators.required],
        street: [this.partner?.street || '', Validators.required],
        number: [this.partner?.number || '', Validators.required],
        complement: [this.partner?.complement || ''],
        neighborhood: [this.partner?.neighborhood || '', Validators.required],
        county: [this.partner?.county || '', Validators.required],
        state: [this.partner?.state || '', Validators.required],
        contact: [this.partner?.contact || '', Validators.required]
      });
    });

    if (!this.index) {
      this.addPage = true;

      this.partnerFormGroup = this._formBuilder.group({
        sequenceNumber: [{ value: '', disabled: true }, Validators.required],
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
    } else {
      this.addPage = false;
    }
    
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

            const partnerArray = this.localStorageService.get('partnerFormGroup');

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
    this.cep = value;
    console.log(this.cep);
    this.CepService.getCep(this.cep).subscribe((response: any) => {
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
    this.router.navigate(['/companies/add']);
  }

  editPartner() {
    let index = this.index;
    console.log(index);

    let editableItem = {
      sequenceNumber: this.partnerFormGroup.get('sequenceNumber').value,
      name: this.partnerFormGroup.get('name').value,
      cpf: this.partnerFormGroup.get('cpf').value,
      dateOfBirth: this.partnerFormGroup.get('dateOfBirth').value,
      cep: this.partnerFormGroup.get('cep').value,
      street: this.partnerFormGroup.get('street').value,
      number: this.partnerFormGroup.get('number').value,
      complement: this.partnerFormGroup.get('complement').value,
      neighborhood: this.partnerFormGroup.get('neighborhood').value,
      county: this.partnerFormGroup.get('county').value,
      state: this.partnerFormGroup.get('state').value,
      contact: this.partnerFormGroup.get('contact').value,
    }

    if (index > -1) {
      Object.assign(this.partnerSource[index], editableItem);
      localStorage.setItem('partnerFormGroup', JSON.stringify(this.partnerSource));
      console.log(this.partnerFormGroup);
    } else {
      console.log(editableItem);
    }
    this.router.navigate(['/companies/add']);
  }

}