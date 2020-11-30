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


@Component({
  selector: 'app-add-agreement',
  templateUrl: './add-agreement.component.html',
  styleUrls: ['./add-agreement.component.scss']
})
export class AddAgreementComponent implements OnInit {
  breadcrumb_model: BreadcrumbModel = {
    active: {
      title: 'Inserir Acordo',
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
    { text: 'Banco', value: 'numberOfInstallments' },
    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true,
  };


  constructor(
    private _formBuilder: FormBuilder, 
    private companyService: CompanyService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    public simpleDataTableService: SimpleDataTableService) { }

  ngOnInit(): void {
    if (this.localStorageService.get('plan') == null) {
      this.plan = []
    } else {
      this.plan = this.localStorageService.get('plan');
    }


    this._loadForm();
    this.companyService.getAll().subscribe(companys => {
      //console.log(companys.content);
      this.companys = companys.content;
    });
  }

  onAddPlan(idPlan: number) {
    const dialogRef = this.dialog.open(AddPlanComponent, {
      data: { id: idPlan },
    });
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
    const index = this.plan.indexOf(row)
    if (index > -1) {
      this.plan.splice(index, 1);
      localStorage.setItem('plan', JSON.stringify(this.plan));
      this.simpleDataTableService.refreshDataTable();
    } else {
      console.log(index);
    }
  }

  loadData = () => {
    // this.companyService.getAll().subscribe(data => {
    //   console.log(data);
    // })
    return this.companyService.getAll().subscribe(data=>{
      //console.log(data);
    });
  };

  private _loadForm(): void {
    this.form = this._formBuilder.group({
      description: ['', [Validators.required]],
      isFastInstallments: ['', [Validators.required]],
    });

    this.form_conditions = this.form.get('conditions') as FormArray;
  }

}
