import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { RootObject } from 'src/app/@core/models/Company';
import { CompanyService } from 'src/app/services/company.service';

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
  Arr = Array;
  plansNumber: 3;

  constructor(
    private _formBuilder: FormBuilder, 
    private companyService: CompanyService,) { }

  ngOnInit(): void {
    this._loadForm();
    this.companyService.getAll().subscribe(companys => {
      console.log(companys.content);
      this.companys = companys.content;
    });
  }

  loadData = () => {
    // this.companyService.getAll().subscribe(data => {
    //   console.log(data);
    // })
    return this.companyService.getAll().subscribe(data=>{
      console.log(data);
    });
  };

  private _loadForm(): void {
    this.form = this._formBuilder.group({
      description: ['', [Validators.required]],
      conditions: new FormArray([
        new FormGroup({
          operador_logico: new FormControl([]),
          variavel: new FormControl([]),
          op_comparacao: new FormControl([]),
          valor: new FormControl([])
        })
      ])
    });

    this.form_conditions = this.form.get('conditions') as FormArray;
  }

}
