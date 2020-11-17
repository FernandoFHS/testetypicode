import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { MonitoringRuleConditionRequestModel } from 'src/app/models/requests/monitoring-rule-condition.request.model';
import { MonitoringRuleRequestModel } from 'src/app/models/requests/monitoring-rule.request.model';
import { MonitoringRuleVariableResponseModel } from 'src/app/models/response/monitoring-rule-variable.response.model';
import { MonitoringRuleService } from 'src/app/services/monitoring-rule.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-rule',
  templateUrl: './edit-rule.component.html',
  styleUrls: ['./edit-rule.component.scss']
})
export class EditRuleComponent implements OnInit {

  emailSeparatorKeysCodes: number[] = [ENTER, COMMA];

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Regra',
      route: 'rule'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Regras', route: 'rule-area' }
    ]
  };

  form: FormGroup;

  logicOperatorList: { text: string; value: string }[] = [{
    text: 'E',
    value: 'E'
  }, {
    text: 'OU',
    value: 'OU'
  }];

  emails: string[] = [];

  variables: MonitoringRuleVariableResponseModel[] = [];

  selectedVariables: MonitoringRuleVariableResponseModel[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _monitoringRuleService: MonitoringRuleService,
    private _notificationService: NotificationService,
    private _el: ElementRef,
    private _spinnerService: NgxSpinnerService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._loadForm();

    this._monitoringRuleService.getVariables().then((variables) => {
      this.variables = variables;

      // this.variables.forEach((variable) => {
      //   console.log(variable.data_type, variable.display_name);
      // });
    });
  }

  addCondition(): void {
    const conditions = this.form.get('conditions') as FormArray;
    conditions.push(this._createCondition());
  }

  onChangeVariable(event: MatSelectChange, index: number): void {
    const conditionsForm = this.form.get('conditions') as FormArray;

    const variable = this.variables.find(v => v.variable_name == event.value);
    const comparisonOperatorForm = conditionsForm.controls[index].get('comparison_op');
    const valueForm = conditionsForm.controls[index].get('value');

    comparisonOperatorForm.setValue('');
    valueForm.setValue(null);

    if (this.selectedVariables[index]) {
      this.selectedVariables[index] = variable;
    }
    else {
      this.selectedVariables.push(variable);
    }

    comparisonOperatorForm.enable();
  }

  onChangeComparisonOperator(event: MatSelectChange, index: number): void {
    const conditionsForm = this.form.get('conditions') as FormArray;
    const valueForm = conditionsForm.controls[index].get('value');

    valueForm.enable();

    setTimeout(() => {
      this._el.nativeElement.querySelector(`#condition-value-${index}`).focus();
    });
  }

  private _loadForm(): void {
    this.form = this._formBuilder.group({
      description: ['', [Validators.required]],
      conditions: this._formBuilder.array([]),
      critical_level: ['LOW', []],
      email_notification_mode: ['SEND_FOR_ALL', []],
      block_merchant_transactions: [false, []],
      email: ['', [Validators.email]]
    });
  }

  private _createCondition(): FormGroup {
    return this._formBuilder.group({
      logic_op: [{ value: 'E', disabled: false }, []],
      variable: [{ value: '', disabled: false }, [Validators.required]],
      comparison_op: [{ value: '', disabled: true }, [Validators.required]],
      value: [{ value: '', disabled: true }, [Validators.required]]
    });
  }

  save(): void {
    this.form.markAllAsTouched();

    this.form.get('email').setValue('');

    if (this.form.valid) {
      this._spinnerService.show();

      const form = this.form.getRawValue();
      const formConditions = (this.form.get('conditions') as FormArray);

      const conditions: MonitoringRuleConditionRequestModel[] = [];

      for (let index = 0; index < formConditions.controls.length; index++) {
        const formCondition = formConditions.at(index);
        const selectedVariable = this.selectedVariables[index];

        const condition: MonitoringRuleConditionRequestModel = {
          comparison_operator: formCondition.get('comparison_op').value,
          comparison_sequence: index.toString(),
          createdAt: '', // TODO
          id: 0, // TODO
          logical_operator: formCondition.get('logic_op').value,
          monetary_value: selectedVariable.data_type == 'Monetary' ? formCondition.get('value').value : null,
          numeric_without_decimal_places_value: selectedVariable.data_type == 'ListOfValue' ? formCondition.get('value').value : null,
          updatedAt: '', // TODO
          variable_name: formCondition.get('variable').value
        }

        conditions.push(condition);
      }

      const request: MonitoringRuleRequestModel = {
        active: false,
        block_merchant_transactions: form.block_merchant_transactions,
        createdAt: '', // TODO
        critical_level: form.critical_level,
        description: form.description,
        email_notification_mode: form.email_notification_mode,
        email_notification_recipients: this.emails || [],
        id: 0, // TODO
        id_user_of_activation: 0, // TODO
        monitoring_rule_condition: conditions,
        updatedAt: '', // TODO
        rule_type: 0 // TODO
      }

      this._monitoringRuleService.add(request).then((response) => {
        this._notificationService.success('Regra editada com sucesso!');
        this._router.navigate(['rule-area/list-rule']);
      }, (error) => {
        this._notificationService.error('Erro ao editar Regra, tente novamente.');
      }).finally(() => {
        this._spinnerService.hide();
      });
    }
    else {
      this._notificationService.error('Formulário inválido.');
    }
  }

  addEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (this.form.get('email').valid) {
      if ((value || '').trim()) {
        this.emails.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.form.get('email').setValue(null);
    }
    else {
      this._notificationService.error('E-mail inválido.');
    }
  }

  removeEmail(index: number): void {
    this.emails.splice(index, 1);
  }

  back(): void {
    this._router.navigate(['rule-area/list-rule']);
  }
}
