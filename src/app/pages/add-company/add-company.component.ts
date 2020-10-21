import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { CepService } from 'src/app/services/cep.service';
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
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddBankAccountComponent } from '../dialogs/add-bank-account/add-bank-account.component';
import { EditBankAccountComponent } from '../dialogs/edit-bank-account/edit-bank-account.component';
import { DeleteBankAccountComponent } from '../dialogs/delete-bank-account/delete-bank-account.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
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
export class AddCompanyComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  conditionFormGroup: FormGroup;
  complementFormGroup: FormGroup;
  partnerFormGroup: FormGroup;
  cep: number;
  isChecked = false;
  isCheckedBankAdress = false;

  teste;

  constructor(
    private _formBuilder: FormBuilder,
    private CepService: CepService,
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

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
    this.conditionFormGroup = this._formBuilder.group({
      tableSaleCtrl: ['', Validators.required],
      comercialCredit: ['', Validators.required],
      transactionCostCtrl: ['', Validators.required],
      tedCostCtrl: ['', Validators.required],
      referralTransacionCtrl: ['', Validators.required],
      anticipationFeeCtrl: ['', Validators.required],
      ignoreRuleAjCtrl: ['', Validators.required],
      tratamentAjCtrl: ['', Validators.required],
      agencyCtrl: ['', Validators.required],
      agencyDigitCtrl: ['', Validators.required],
      currentAccountCtrl: ['', Validators.required],
      currentAccountDigitCtrl: ['', Validators.required],
      currentAccountAgencyCtrl: ['', Validators.required],
      benefitedTypeCtrl: [
        { value: 'Pessoa Jurídica', disabled: true },
        Validators.required,
      ],
      benefitedNameCtrl: [{ value: '', disabled: true }, Validators.required],
      cnpjCtrl: [{ value: '', disabled: true }, Validators.required],
    });
    this.complementFormGroup = this._formBuilder.group({
      openingHoursCtrl: [Validators.required],
      urlEcommerceCtrl: ['', Validators.required],
      urlCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      posAmountCtrl: ['', Validators.required],
      logicNumberCtrl: ['', Validators.required],
      idTerminalCtrl: ['', Validators.required],
      codeSoftwareCtrl: ['', Validators.required],
    });
    this.partnerFormGroup = this._formBuilder.group({});

    this.dataService.refreshTable().subscribe(() => {
      this.loadData();
    });

    this.loadData();
  }

  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
    { text: 'CPF / CNPJ', value: 'title' },
    { text: 'Identificação', value: 'nameprofile' },
    { text: 'Tipo', value: 'description' },
    { text: 'Razão Social', value: 'razsoc' },
    { text: 'MCC	', value: 'mcc' },
    { text: 'Parceiro', value: 'parner' },
    { text: 'Status', value: 'status' },
    { text: 'Tab.Vendas', value: 'tabsell' },
    { text: 'Situação', value: 'situation' },

    // { text: 'Ações', value: 'action' }
  ];

  headersBankTable: HeaderModel[] = [
    { text: 'Banco', value: 'id' },
    { text: 'Agência', value: 'nameprofile' },
    { text: 'Dígito Agência', value: 'title' },
    { text: 'Conta Corrente', value: 'description' },
    { text: 'Dígito Conta', value: 'razsoc' },
    { text: 'Dígito Agência/Conta', value: 'mcc' },

    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true,
  };

  dataSource: any[] = [];

  public loadData() {
    //this.exampleDatabase = new DataService(this.httpClient);

    this.dataService.getAllProfiles().then(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        // TODO
      }
    );
  }

  onDelete(idProfile: number) {
    const dialogRef = this.dialog.open(DeleteBankAccountComponent, {
      data: { id: idProfile },
    });
  }

  onEdit(idProfile: number) {
    const dialogRef = this.dialog.open(EditBankAccountComponent, {
      data: { id: idProfile },
    });
  }

  onEditPartner(idProfile: number) {
    const dialogRef = this.dialog.open(EditBankAccountComponent, {
      data: { id: idProfile },
    });
  }

  onAdd(idProfile: number) {
    const dialogRef = this.dialog.open(AddBankAccountComponent, {
      data: { id: idProfile },
    });
  }

  onAddPartner(index: number) {
    this.router.navigate(['/company-list/add-partner']);
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getEndereco(value) {
    this.cep = value;
    console.log(this.cep);
    this.CepService.getCep(this.cep).subscribe((response: any) => {
      console.log(response);

      let obj = {
        cidade: response.localidade,
        logradouro: response.logradouro,
        bairro: response.bairro,
        estado: response.uf,
      };
      this.teste = response;
      this.secondFormGroup.patchValue(obj);
      console.log(this.secondFormGroup);
    });

    if (this.isChecked == true) {
      this.getSecondcep(value);
    }
  }

  getfisrtcep() {}

  getSecondcep(cep) {
    this.cep = cep;
    this.CepService.getCep(this.cep).subscribe((response: any) => {
      let cep2 = {
        secondcep: response.cep,
        secondcidade: response.localidade,
        secondlogradouro: response.logradouro,
        secondbairro: response.bairro,
        secondstate: response.uf,
      };
      this.secondFormGroup.patchValue(cep2);
    });
  }

  checkValue(e) {
    let a = e.checked;
    if (a == true) {
      this.isChecked = true;
      console.log(this.teste);
      let obj = {
        secondcep: this.teste.cep,
        secondbairro: this.teste.bairro,
        secondcidade: this.teste.localidade,
        secondlogradouro: this.teste.logradouro,
        secondstate: this.teste.uf,
        secondnumero: this.secondFormGroup.get('numero').value,
        secondcomplemento: this.secondFormGroup.get('complemento').value,
        secondnomeresponsavel: this.secondFormGroup.get('nomeresponsavel')
          .value,
        secondpontodereferencia: this.secondFormGroup.get('pontodereferencia')
          .value,
      };
      this.secondFormGroup.patchValue(obj);
    }
    if (a == false) {
      this.isChecked = false;
      console.log('falso');
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
      };
      this.secondFormGroup.patchValue(obj);
    }
  }
  onSelectionChanged(value) {
    let a = value.checked;
    console.log(value.checked);
    if (a === true) {
      this.secondFormGroup.get('secondcep').disable();
      this.secondFormGroup.get('secondbairro').disable();
      this.secondFormGroup.get('secondcidade').disable();
      this.secondFormGroup.get('secondlogradouro').disable();
      this.secondFormGroup.get('secondstate').disable();
      this.secondFormGroup.get('secondnumero').disable();
      this.secondFormGroup.get('secondcomplemento').disable();
      this.secondFormGroup.get('secondnomeresponsavel').disable();
      this.secondFormGroup.get('secondpontodereferencia').disable();

      this.isChecked = true;
    } else {
      this.secondFormGroup.get('secondcep').enable();
      this.secondFormGroup.get('secondbairro').enable();
      this.secondFormGroup.get('secondcidade').enable();
      this.secondFormGroup.get('secondlogradouro').enable();
      this.secondFormGroup.get('secondstate').enable();
      this.secondFormGroup.get('secondnumero').enable();
      this.secondFormGroup.get('secondcomplemento').enable();
      this.secondFormGroup.get('secondnomeresponsavel').enable();
      this.secondFormGroup.get('secondpontodereferencia').enable();

      this.isChecked = false;
    }
  }

  checkValueBankAdress(e) {
    let isCheckedBankAdress = e.checked;

    if (isCheckedBankAdress == true) {
      this.isCheckedBankAdress = true;

      this.conditionFormGroup.get('benefitedTypeCtrl').enable();
      this.conditionFormGroup.get('benefitedNameCtrl').enable();
      this.conditionFormGroup.get('cnpjCtrl').enable();
    } else {
      this.isCheckedBankAdress = false;

      this.conditionFormGroup.get('benefitedTypeCtrl').disable();
      this.conditionFormGroup.get('benefitedNameCtrl').disable();
      this.conditionFormGroup.get('cnpjCtrl').disable();
    }
  }
}
