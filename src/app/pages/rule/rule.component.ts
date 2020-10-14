import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  breadcrumb_model: BreadcrumbModel = {
    active: {
      title: 'Incluir Regra',
      route: 'rule'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Regras', route: 'rules' }
    ]
  };

  form: FormGroup;
  form_conditions;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._loadForm();
  }

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
