import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.scss']
})
export class AddRuleComponent implements OnInit {

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

  logic_operator_list: any[] = [{
    text: 'E',
    value: 1
  }, {
    text: 'OU',
    value: 2
  }];

  variable_list: any[] = [{
    text: 'Valor Transação',
    value: 0,
    comparison_operator_list: [
      { text: 'Igual' },
      { text: 'Maior' },
      { text: 'Menor' },
      { text: 'Maior ou Igual' },
      { text: 'Menor ou Igual' },
      { text: 'Diferente' },
    ]
  }, {
    text: 'Adquirente',
    value: 1,
    comparison_operator_list: [
      { text: 'Entre' },
      { text: 'Diferente' },
      { text: 'Entre' },
    ]
  }, {
    text: 'CNAE',
    value: 2,
    comparison_operator_list: [
      { text: 'Entre' },
      { text: 'Diferente' },
      { text: 'Entre' },
    ]
  }, {
    text: 'MCC',
    value: 3,
    comparison_operator_list: [
      { text: 'Entre' },
      { text: 'Diferente' },
      { text: 'Entre' },
    ]
  }, {
    text: 'Modo Entrada',
    value: 4,
    comparison_operator_list: [
      { text: 'Entre' },
      { text: 'Diferente' },
      { text: 'Entre' },
    ]
  }, {
    text: 'Tipo Venda',
    value: 5,
    comparison_operator_list: [
      { text: 'Entre' },
      { text: 'Diferente' },
      { text: 'Entre' },
    ]
  }, {
    text: 'Status Transação',
    value: 6,
    comparison_operator_list: [
      { text: 'Entre' },
      { text: 'Diferente' },
      { text: 'Entre' },
    ]
  }, {
    text: 'Código Retorno',
    value: 7,
    comparison_operator_list: [
      { text: 'Entre' },
      { text: 'Diferente' },
      { text: 'Entre' },
    ]
  }, {
    text: 'Horário Transação',
    value: 8,
    comparison_operator_list: [
      { text: 'Maior' },
      { text: 'Menor' },
      { text: 'Maior ou Igual' },
      { text: 'Menor ou Igual' },
    ]
  }, {
    text: 'Recorrência - Mesmo Estabelecimento e Mesmo Valor Transação',
    value: 9,
    comparison_operator_list: [
      { text: 'Maior' },
      { text: 'Maior ou Igual' }
    ]
  }, {
    text: 'Recorrência - Mesmo Estabelecimento, Mesmo Valor Transação e Mesmo Número Cartão',
    value: 10,
    comparison_operator_list: [
      { text: 'Maior' },
      { text: 'Maior ou Igual' }
    ]
  }, {
    text: 'Recorrência - Mesmo Estabelecimento e Mesmo Número Cartão',
    value: 11,
    comparison_operator_list: [
      { text: 'Maior' },
      { text: 'Maior ou Igual' }
    ]
  }, {
    text: 'Volume',
    value: 12,
    comparison_operator_list: [
      { text: 'Maior' },
      { text: 'Maior ou Igual' }
    ]
  }, {
    text: 'Volume por Hora',
    value: 13,
    comparison_operator_list: [
      { text: 'Maior' },
      { text: 'Maior ou Igual' }
    ]
  }, {
    text: 'Ticket Médio',
    value: 14,
    comparison_operator_list: [
      { text: 'Maior' },
      { text: 'Maior ou Igual' }
    ]
  }, {
    text: 'Ticket Médio por Hora',
    value: 15,
    comparison_operator_list: [
      { text: 'Maior' },
      { text: 'Maior ou Igual' }
    ]
  }];

  condition_comparison_operator_list: any[] = [];

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._loadForm();
  }

  addCondition(): void {
    const conditions = this.form.get('conditions') as FormArray;
    conditions.push(this._createCondition());
    this.condition_comparison_operator_list.push();
  }

  onChangeVariable(event: MatSelectChange, index: number): void {
    console.log(event);
    this.condition_comparison_operator_list[index] = event.value;

    console.log(this.condition_comparison_operator_list);
  }

  private _loadForm(): void {
    this.form = this._formBuilder.group({
      description: ['', []],
      conditions: this._formBuilder.array([])
    });
  }

  private _createCondition(): FormGroup {
    return this._formBuilder.group({
      operador_logico: [{ value: '', disabled: false }, []],
      variavel: [{ value: '', disabled: false }, []],
      op_comparacao: [{ value: '', disabled: false }, []],
      valor: [{ value: '', disabled: true }, []]
    });
  }
}
