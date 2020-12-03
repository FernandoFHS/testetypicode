import { PlanService } from './../../../services/plan.service';
import { AddPlanComponent } from './../../dialogs/add-plan/add-plan.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { RootObject } from 'src/app/@core/models/Company';
import { CompanyService } from 'src/app/services/company.service';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDataTableService } from 'src/app/@core/components/simple-data-table/simple-data-table.service';
import { ActionModel } from 'src/app/@core/models/action.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { AgreementService } from 'src/app/services/agreement.service';

@Component({
  selector: 'app-add-agreement',
  templateUrl: './add-agreement.component.html',
  styleUrls: ['./add-agreement.component.scss']
})
export class AddAgreementComponent implements OnInit {
  breadcrumb_model: BreadcrumbModel = {
    active: {
      title: 'Inserir Contrato',
      route: 'rule'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Contratos', route: '/agreements' },
    ]
  };

  form: FormGroup;
  form_conditions;
  companys: any[];

  plan: any = [];

  headersPlan: HeaderModel[] = [
    { text: 'Adquirente', value: 'acquirer', subValue: 'description' },
    { text: 'Bandeira', value: 'creditCardFlag', subValue: 'flagName' },
    { text: 'Tipo de Remuneração', value: 'remunerationType', subValue: 'description' },
    { text: 'Entidade de Serviço', value: 'serviceEntity', subValue: 'description' },
    { text: 'Valor', value: 'value' },
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true,
    view: true
  };

  constructor(
    private _formBuilder: FormBuilder, 
    private _spinnerService: NgxSpinnerService,
    private _notificationService: NotificationService,
    private companyService: CompanyService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    public simpleDataTableService: SimpleDataTableService,
    public _agreementService: AgreementService
    ) { }

  ngOnInit(): void {
    if (this.localStorageService.get('plan') == null) {
      this.plan = []
    } else {
      this.plan = this.localStorageService.get('plan');
    }

    this._loadForm();

    this.form.valueChanges.subscribe(newValue=>console.log('Form Parent - ',newValue));
    
    this.companyService.getAll().subscribe(companys => {
      this.companys = companys.content;
    });

    // this.form.controls.plans = this._formBuilder.array(this.localStorageService.get('plan'));
  }

  onAddPlan(idPlan: number) {
    const dialogRef = this.dialog.open(AddPlanComponent, {
      data: { id: idPlan },
    });
    let instance = dialogRef.componentInstance;
    instance.agreementForm = this.form;

    dialogRef.afterClosed().subscribe((item) => {
      if(item.value){
        this.plan.push(item.value);
        this.plan = [...this.plan];
        this.simpleDataTableService.refreshDataTable();
      }
    })
  }

  onEditPlan(row: object) {
    const index = this.plan.indexOf(row)
    const dialogRef = this.dialog.open(AddPlanComponent, {
      data: index
    });
    dialogRef.afterClosed().subscribe((item) => {
      Object.assign(this.plan, item);
      this.simpleDataTableService.refreshDataTable();
    })
  }

  onDeletePlan(row: object){
    // const index = this.plan.indexOf(row)
    // if (index > -1) {
    //   this.plan.splice(index, 1);
    //   localStorage.setItem('plan', JSON.stringify(this.plan));
    //   this.simpleDataTableService.refreshDataTable();
    // } else {
    //   console.log(index);
    // }
    
    let array = [] = this.planArray.value;
    let index = array.indexOf(row)
    
    if(index > -1){
      this.planArray.removeAt(this.planArray.value.findIndex(item => item === array[index]))
      setTimeout(_=>{ this.simpleDataTableService.refreshDataTable(); }, 50);
    }else {
      this.simpleDataTableService.refreshDataTable();
    }
  }
  get planArray() {
    return this.form.get('plans') as FormArray;
  }

  loadData = () => {
    return this.companyService.getAll()
  };

  private _loadForm(): void {
    this.form = this._formBuilder.group({
      description: ['', [Validators.required]],
      isFastInstallments: ['', [Validators.required]],
      idCompany: ['', [Validators.required]],
      plans: this._formBuilder.array([]),
    });

  }

  save(): void {
    this.form.markAllAsTouched();

    // const isValid = this._validateForm();
    const isValid = true;

    if (isValid) {
      this._spinnerService.show();
    }

    this._agreementService.postOrPut(this.form.value).subscribe((response) => {
      this._notificationService.success('Contrato criado com sucesso!');
      this._spinnerService.hide();
      //this._router.navigate(['rules/list']);
    }, (error) => {
      this._notificationService.error('Erro ao criar contrato, tente novamente.');
      this._spinnerService.hide();
    }, () => {
      this._spinnerService.hide();
    });

  }
}