import { PlanService } from '../../../services/agreement/plan.service';
import { AddPlanComponent } from '../../dialogs/add-plan/add-plan.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { CompanyService } from 'src/app/services/company.service';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDataTableService } from 'src/app/@core/components/simple-data-table/simple-data-table.service';
import { ActionModel } from 'src/app/@core/models/action.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { AgreementService } from 'src/app/services/agreement/agreement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTypeEnum } from 'src/app/enums/page-type.enum';
import { AgreementResponse } from 'src/app/models/Agreement';

@Component({
  selector: 'app-crud-agreement',
  templateUrl: './crud-agreement.component.html',
  styleUrls: ['./crud-agreement.component.scss']
})
export class CrudAgreementComponent implements OnInit {

  private _breadcrumbItems = [
    { title: 'Home', route: '' },
    { title: 'Contratos', route: '/agreements' },
  ];
  addBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Contrato',
      route: ''
    },
    items: this._breadcrumbItems
  };

  editBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Contrato',
      route: ''
    },
    items: this._breadcrumbItems
  };

  viewBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Visualizar Contrato',
      route: ''
    },
    items: this._breadcrumbItems
  };

  form: FormGroup;
  form_conditions;
  companys: any[];

  idCompanyGroup: string;

  plan: any = [];

  model: AgreementResponse;

  headersPlan: HeaderModel[] = [
    
    { text: 'numberOfInstallments', value: 'numberOfInstallments' },
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

  formData: any = []

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
    private route: ActivatedRoute

  ) { }

  async ngOnInit(): Promise<void> {

    if (this.localStorageService.get('idCompanyGroup') == null) {
      this.idCompanyGroup = this.route.snapshot.queryParamMap.get('idCompanyGroup');
      this.localStorageService.set('idCompanyGroup', this.idCompanyGroup);
    } else {
      this.idCompanyGroup = this.localStorageService.get('idCompanyGroup');
    }

    await this._loadParams();

    if (this.isPageEdit()) {
      await this._loadModel();
      this._loadFormEdit();
    } else if (this.isPageView()) {
      this.actions = {
        add: false,
        edit: false,
        delete: false,
        view: true
      };
      await this._loadModel();
      this._loadFormEdit();
    } else {
      this._loadFormAdd();
    }



    this.form.valueChanges.subscribe(newValue => {
      console.log(newValue);
      console.log(newValue.plans);
      
    });

    //this.companyService.getAll().subscribe(companys => {
    // this._agreementService.getCompany(+this.idCompanyGroup).subscribe(companys => {

    //   this.companys = companys.content;
    // });
  }

  refreshPlanDataTable(data?){
    if(data){
      this.localStorageService.set('plans', data)
    }else {
      this.localStorageService.set('plans', this.form.controls.plans.value)
    }
    
    this.formData = this.localStorageService.get('plans')
    this.simpleDataTableService.refreshDataTable();
  }

  private _loadModel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._agreementService.getById(this.id).subscribe((model) => {
        console.log('model', model);
        this.refreshPlanDataTable(model.plans);
        this.model = model;
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
    instance.isPageAdd = true;
    dialogRef.afterClosed().subscribe((item) => {
      if (item.value) {
        this.plan.push(item.value);
        this.plan = [...this.plan];
        this.simpleDataTableService.refreshDataTable();
      }
    })
  }

  onEditPlan(row: object) {
    console.log('onEditPlan', row);

    let array = [] = this.planArray.value;
    let index = array.indexOf(row)

    let dialogRef = this.dialog.open(AddPlanComponent, {
      data: row
    });
    let instance = dialogRef.componentInstance;
    instance.agreementForm = this.form;
    instance.isPageEdit = true;

    dialogRef.afterClosed().subscribe((item) => {
      Object.assign(this.plan, item);
      this.simpleDataTableService.refreshDataTable();
    })
  }

  onViewPlan(row: object) {
    console.log('onViewPlan', row);
    let array = [] = this.planArray.value;
    let index = array.indexOf(row)

    let dialogRef = this.dialog.open(AddPlanComponent, {
      data: array[index]
    });
    let instance = dialogRef.componentInstance;
    instance.agreementForm = this.form;
    instance.isPageView = true;
  }

  onDeletePlan(row: object) {
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
    //console.log(array[index]);
    //return 0
    
    //if (!this.model || !this.model.plans.includes(array[index])) {
    if (array[index].id==0) {
        if (index > -1) {
        this.planArray.removeAt(this.planArray.value.findIndex(item => item === array[index]))
        setTimeout(_ => { this.simpleDataTableService.refreshDataTable(); }, 50);
      } else {
        this.simpleDataTableService.refreshDataTable();
      }
    } else {
      this._notificationService.error('Não é possível excluir um plano em utilização!');
    }

  }
  get planArray() {
    return this.form.get('plans') as FormArray;
  }

  loadData = () => {
    //return this.companyService.getAll()
    return this.form.controls.plans.value
  };

  private _loadFormAdd(): void {
    this.form = this._formBuilder.group({
      description: ['', [Validators.required]],
      isFastInstallments: ['', [Validators.required]],
      idCompany: [this.idCompanyGroup],
      plans: this._formBuilder.array([]),
    });
  }

  private _loadFormEdit(): void {
    this.form = this._formBuilder.group({
      id: [this.model.id],
      description: [{ value: this.model.description, disabled: this.isPageView() }, [Validators.required]],
      isFastInstallments: [{ value: this.model.isFastInstallments, disabled: this.isPageView() }, [Validators.required]],
      idCompany: [this.model.idCompany],
      plans: this._formBuilder.array(this.model.plans),
    });

  }

  save() {
    this.form.markAllAsTouched();  
    if(this.form.value.plans.length==0){
      this._notificationService.error('É necessário criar ao menos um plano.');
      return 0;
    }
    const isValid = this.form.valid;
    if (isValid) {
      this._spinnerService.show();
      this._agreementService.post(this.form.value).subscribe((response) => {
        this._notificationService.success('Contrato criado com sucesso!');
        this._spinnerService.hide();
        this._router.navigate(['agreements/list']);
      }, (error) => {
        this._notificationService.error('Erro ao criar contrato, tente novamente.');
        this._spinnerService.hide();
      }, () => {
        this._spinnerService.hide();
      });
    } else {
      this._notificationService.error('Preencha todos os campos obrigatórios.');
    }
  }

  update() {
    this.form.markAllAsTouched();
    if(this.form.value.plans.length==0){
      this._notificationService.error('É necessário criar ao menos um plano.');
      return 0;
    }
    const isValid = this.form.valid;
    if (isValid) {
      this._spinnerService.show();
      this._agreementService.put(this.form.value).subscribe((response) => {
        this._notificationService.success('Contrato atualizado com sucesso!');
        this._spinnerService.hide();
        this._router.navigate(['agreements/list']);
      }, (error) => {
        this._notificationService.error('Erro ao atualizar contrato, tente novamente.');
        this._spinnerService.hide();
      }, () => {
        this._spinnerService.hide();
      });
    } else {
      this._notificationService.error('Preencha todos os campos obrigatórios.');
    }
  }
}