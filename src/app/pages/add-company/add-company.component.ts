import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class AddCompanyComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  cep: number;

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
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
      sixthCtrl: ['', Validators.required],
      seventhCtrl: ['', Validators.required],
      eighthCtrl: ['', Validators.required],
      ninethCtrl: ['', Validators.required],
      tenCtrl: ['', Validators.required],
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
        cidade : response.localidade,
        logradouro : response.logradouro,
        bairro : response.bairro,
        estado : response.uf
        }

        this.secondFormGroup.patchValue( { secondFormGroup : obj } );
      },

    );
  }

}
