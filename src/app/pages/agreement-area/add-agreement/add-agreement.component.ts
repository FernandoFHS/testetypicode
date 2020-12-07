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
import { ActivatedRoute, Router } from '@angular/router';
import { PageTypeEnum } from 'src/app/enums/page-type.enum';
import { AgreementContent, AgreementResponse } from 'src/app/models/Agreement';

@Component({
  selector: 'app-add-agreement',
  templateUrl: './add-agreement.component.html',
  styleUrls: ['./add-agreement.component.scss']
})
export class AddAgreementComponent implements OnInit {

  private _breadcrumbItems = [
      { title: 'Home', route: '' },
      { title: 'Contratos', route: '/agreements' },
  ];
  addBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Regra',
      route: ''
    },
    items: this._breadcrumbItems
  };

  editBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Regra',
      route: ''
    },
    items: this._breadcrumbItems
  };

  form: FormGroup;
  form_conditions;
  companys: any[];

  plan: any = [];

  model: AgreementResponse;

  headersPlan: HeaderModel[] = [
    { text: 'Adquirente', value: 'acquirer', subValue: 'description' },
    { text: 'Bandeira', value: 'creditCardFlag', subValue: 'flagName' },
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true,
    view: true
  };

  pageType: PageTypeEnum;
  isLoading: boolean;
  id: number;

  constructor(
    private _formBuilder: FormBuilder, 
    private _spinnerService: NgxSpinnerService,
    private _notificationService: NotificationService,
    private companyService: CompanyService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    public simpleDataTableService: SimpleDataTableService,
    public _agreementService: AgreementService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService,
    ) { }

    async ngOnInit(): Promise<void> {
    await this._loadParams();

    if (this.isPageEdit()) {
      await this._loadModel();
      this._loadFormEdit();
    }else {
      this._loadFormAdd();
    }

    if (this.localStorageService.get('plan') == null) {
      this.plan = []
    } else {
      this.plan = this.localStorageService.get('plan');
    }

    //this._loadFormAdd();

    this.form.valueChanges.subscribe(newValue=>console.log('Form Parent - ',newValue));
    
    this.companyService.getAll().subscribe(companys => {
      this.companys = companys.content;
    });

    // this.form.controls.plans = this._formBuilder.array(this.localStorageService.get('plan'));
  }

  private _loadModel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._agreementService.getById(this.id).subscribe((model) => {
        this.model = model;
        console.log(model);
        

        // if (this.model) {
        //   //this.emails = this.model.email_notification_recipients;

        //   // TODO
        //   // this.ruleAlreadyActivated = this.model.id_user_of_activation > 0 || this.isPageView();
        //   //this.ruleAlreadyActivated = this.model.active || this.isPageView() ? true : false;

        //   resolve();
        // }
        // else {
        //   this._backWithError();
        //   reject();
        // }
        resolve();
      }, (error) => {
        this._backWithError();
        reject();
      });
    });
  }

  private _backWithError(): void {
    this.back();
    this._notificationService.error('Ops, houve um erro ao carregar o Contrato, tente novamente.');
  }

  back(): void {
    this._router.navigate(['agreements/list']);
  }

  isPageEdit(): boolean {
    return this.pageType == PageTypeEnum.EDIT;
  }

  isPageAdd(): boolean {
    return this.pageType == PageTypeEnum.ADD;
  }

  isPageView(): boolean {
    return this.pageType == PageTypeEnum.VIEW;
  }

  private _loadParams(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._activatedRoute.params.subscribe((params) => {
        this.id = params['id'];

        if (this.id || this.id == 0) {
          this.pageType = this._router.url.includes('view') ? PageTypeEnum.VIEW : PageTypeEnum.EDIT;
          resolve();
        }
        else {
          this.pageType = PageTypeEnum.ADD;
          resolve();
        }
      });
    });
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
    //const index = this.plan.indexOf(row)
    let array = [] = this.planArray.value;
    let index = array.indexOf(row)
    console.log(array[index]);
    return 0;
    
    const dialogRef = this.dialog.open(AddPlanComponent, {
      data: this.model ? this.model.plans.filter(e => e === row)[0] : array[index]
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

      
    if(!this.model.plans.includes(array[index])){
      
      
      if(index > -1){
        this.planArray.removeAt(this.planArray.value.findIndex(item => item === array[index]))
        setTimeout(_=>{ this.simpleDataTableService.refreshDataTable(); }, 50);
      }else {
        this.simpleDataTableService.refreshDataTable();
      }
    }else {
      this._notificationService.error('Não é possível excluir um plano em utilização!');
    }
      
  }
  get planArray() {
    return this.form.get('plans') as FormArray;
  }

  loadData = () => {
    return this.companyService.getAll()
  };

  private _loadFormAdd(): void {
    this.form = this._formBuilder.group({
      description: ['', [Validators.required]],
      isFastInstallments: ['', [Validators.required]],
      idCompany: ['', [Validators.required]],
      plans: this._formBuilder.array([]),
    });
  }

  private _loadFormEdit(): void {
    this.form = this._formBuilder.group({
      id: [this.model.id],
      description: [this.model.description, [Validators.required]],
      isFastInstallments: [this.model.isFastInstallments, [Validators.required]],
      idCompany: [this.model.idCompany, [Validators.required]],
      plans: this._formBuilder.array(this.model.plans),
    });
    // this.form.controls['remunerationType'].setValue(this.form.value.remuneration.remunerationType);
    // console.log(this.model.plans);
    // this.form.controls['plans'].setValue(this._formBuilder.array(this.model.plans)); 
  }

  save(): void {
    this.form.markAllAsTouched();
    // const isValid = this._validateForm();
    const isValid = true;
    if (isValid) {
      this._spinnerService.show();
    }
    this._agreementService.post(this.form.value).subscribe((response) => {
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

  update(): void {
    this.form.markAllAsTouched();
    // const isValid = this._validateForm();
    const isValid = true;
    if (isValid) {
      this._spinnerService.show();
    }
    this._agreementService.put(this.form.value).subscribe((response) => {
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