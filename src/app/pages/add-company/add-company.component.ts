import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class AddCompanyComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  cep: number;
  isChecked = false;


  teste;


  constructor(
    private _formBuilder: FormBuilder,
    private CepService: CepService
  ) { }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
      sixthCtrl: ['', Validators.required],
      seventhCtrl: ['', Validators.required],
      eighthCtrl: ['', Validators.required],
      ninethCtrl: ['', Validators.required],
      tenthCtrl: ['', Validators.required],
      eleventhCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      cidade: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      estado: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      nomeresponsavel: ['', Validators.required],
      pontodereferencia: ['', Validators.required],
      fisrtcep: ['', Validators.required],
      secondcep: ['', Validators.required],
      secondbairro: ['', Validators.required],
      secondcidade: ['', Validators.required],
      secondlogradouro: ['', Validators.required],
      secondnumero: ['', Validators.required],
      secondcomplemento: ['', Validators.required],
      secondstate: ['', Validators.required],
      secondnomeresponsavel: ['', Validators.required],
      secondpontodereferencia: ['', Validators.required],

    });
    this.thirdFormGroup = this._formBuilder.group({
      tableSaleCtrl: ['', Validators.required],
      transactionCostCtrl: ['', Validators.required],
      tedCostCtrl: ['', Validators.required],
      benefitedNameCtrl: ['', Validators.required],
      cnpjCtrl: ['', Validators.required],
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getEndereco(value) {
    this.cep = value
    console.log(this.cep)
    this.CepService.getCep(this.cep).subscribe(
      (response: any) => {
        console.log(response);

        let obj = {
          cidade: response.localidade,
          logradouro: response.logradouro,
          bairro: response.bairro,
          estado: response.uf
        }
        this.teste = response;
        this.secondFormGroup.patchValue(obj);
        console.log(this.secondFormGroup);
      },
    
    );
  }

  getfisrtcep() {

  }

  getSecondcep(cep) {
    this.cep = cep;
    this.CepService.getCep(this.cep).subscribe(
      (response: any) => {
        let cep2 = {
          secondcidade: response.localidade,
          secondlogradouro: response.logradouro,
          secondbairro: response.bairro,
          secondstate: response.uf
        }
        this.secondFormGroup.patchValue(cep2);
      }
    );
  }

  checkValue(e) {

    let a = e.checked
    if (a == true) {
      console.log(this.teste)
      let obj = {
        secondcep: this.teste.cep,
        secondbairro: this.teste.bairro,
        secondcidade: this.teste.localidade,
        secondlogradouro: this.teste.logradouro,
        secondstate: this.teste.uf,
        secondnumero: this.secondFormGroup.get('numero').value,
        secondcomplemento: this.secondFormGroup.get('complemento').value,
        secondnomeresponsavel: this.secondFormGroup.get('nomeresponsavel').value,
        secondpontodereferencia: this.secondFormGroup.get('pontodereferencia').value,



      }
      this.secondFormGroup.patchValue(obj);
    } if (a == false) {
      console.log('falso')
      let obj = {
        secondcep: '',
        secondbairro: '',
        secondcidade: '',
        secondlogradouro: '',
        secondstate: '',
        secondnumero: '',
        secondcomplemento: '',
        secondnomeresponsavel: '',
        secondpontodereferencia: '',

      }
      this.secondFormGroup.patchValue(obj);
    }
  }





}
