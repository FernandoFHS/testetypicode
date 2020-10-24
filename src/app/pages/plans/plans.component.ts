import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
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
  ]
})
export class PlansComponent implements OnInit {

  planFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.planFormGroup = this._formBuilder.group({
      idAcquirer: ['', Validators.required],
      idPaymentDeadLine: ['Vero', Validators.required],
      description: ['', Validators.required],
      isFastInstallments: ['', Validators.required],
      idServiceEntity: ['', Validators.required],
      idCreditCardFlag: ['', Validators.required],
      idPaymentMethod: ['', Validators.required],
      value: ['', Validators.required]
    })
  }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

}
