import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { CepService } from 'src/app/services/cep.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent implements OnInit {

  partnerFormGroup: FormGroup;

  partnerSource: any = this.localStorageService.get('partnerFormGroup');
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
  };

  constructor(

    private _formBuilder: FormBuilder,
    private CepService: CepService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
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
        county: response.localidade,
        street: response.logradouro,
        neighborhood: response.bairro,
        state: response.uf,
      };
      this.response = response;
      this.partnerFormGroup.patchValue(obj);
    });
  }



}
