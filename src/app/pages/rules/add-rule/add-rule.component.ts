import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { MonitoringRuleService } from 'src/app/services/monitoring-rule.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { NotificationService } from 'src/app/services/notification.service';
import { MonitoringRuleVariableResponseModel } from 'src/app/models/response/monitoring-rule-variable.response.model';
import { MonitoringRuleRequestModel } from 'src/app/models/requests/monitoring-rule.request.model';
import { MonitoringRuleConditionRequestModel } from 'src/app/models/requests/monitoring-rule-condition.request.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { RuleTypeEnum } from 'src/app/enums/rule-type.enum';
import { RuleEmailNotificationModeEnum } from 'src/app/enums/rule-email-notification-mode.enum';
import { VariableDataTypeEnum } from 'src/app/enums/variable-data-type.enum';
import { ConditionTypeListModel } from 'src/app/models/rules/condition-type-list.model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.scss']
})
export class AddRuleComponent implements OnInit {

  emailSeparatorKeysCodes: number[] = [ENTER, COMMA];

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Regra',
      route: ''
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Regras', route: 'rules' }
    ]
  };

  form: FormGroup;

  logicOperatorList: { text: string; value: string }[] = [{
    text: 'E',
    value: '&&'
  }, {
    text: 'OU',
    value: '||'
  }];

  emails: string[] = [];

  variables: MonitoringRuleVariableResponseModel[] = [];

  selectedVariables: MonitoringRuleVariableResponseModel[] = [];

  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;

  constructor(
    private _formBuilder: FormBuilder,
    private _monitoringRuleService: MonitoringRuleService,
    private _notificationService: NotificationService,
    private _el: ElementRef,
    private _spinnerService: NgxSpinnerService,
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef
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

    valueForm.disable();
    comparisonOperatorForm.enable();

    if (this.selectedVariables[index]) {
      this.selectedVariables[index] = variable;
    }
    else {
      this.selectedVariables.push(variable);
    }

    if (variable.data_type == VariableDataTypeEnum.LIST_OF_VALUE) {
      // this._spinnerService.show();
      this.selectedVariables[index].is_loading_data = true;

      this._monitoringRuleService.getRuleConditionListByEnum(variable.variable_name).then((data) => {
        if (data && data.length > 0) {
          variable.options_condition_type_list = data;
          variable.filtered_options_condition_type_list = data;
        }
        else {
          variable.options_condition_type_list = [];
          variable.filtered_options_condition_type_list = [];
        }
      }).finally(() => {
        variable.is_loading_data = false;
      });
    }
  }

  onChangeComparisonOperator(event: MatSelectChange, index: number): void {
    const conditionsForm = this.form.get('conditions') as FormArray;
    const valueForm = conditionsForm.controls[index].get('value');

    valueForm.enable();

    setTimeout(() => {
      this._el.nativeElement.querySelector(`#condition-value-${index}`).focus();
    });

    this.clearValue(index);
  }

  private _loadForm(): void {
    this.form = this._formBuilder.group({
      description: ['', [Validators.required]],
      conditions: this._formBuilder.array([]),
      critical_level: [RuleTypeEnum.LOW, []],
      email_notification_mode: [RuleEmailNotificationModeEnum.SEND_FOR_ALL, []],
      block_merchant_transactions: [false, []],
      email: ['', [Validators.email]]
    });
  }

  private _createCondition(): FormGroup {
    return this._formBuilder.group({
      logic_op: [{ value: '&&', disabled: false }, []],
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
          logical_operator: (index == formConditions.controls.length || formConditions.controls.length == 1) ? '' : formCondition.get('logic_op').value,
          monetary_value: selectedVariable.data_type == VariableDataTypeEnum.MONETARY ? formCondition.get('value').value : null,
          numeric_without_decimal_places_value: selectedVariable.data_type == VariableDataTypeEnum.LIST_OF_VALUE ? formCondition.get('value').value : null,
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
        rule_type: RuleTypeEnum.NORMAL // TODO
      }

      this._monitoringRuleService.add(request).then((response) => {
        this._notificationService.success('Regra criada com sucesso!');
        this._router.navigate(['rules/list']);
      }, (error) => {
        this._notificationService.error('Erro ao criar Regra, tente novamente.');
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
    this._router.navigate(['rules/list']);
  }

  add(event) {
    console.log('add');
  }

  onSelectConditionTypeList(event: { option: { value: ConditionTypeListModel } }, index: number) {
    const conditionsForm = this.form.get('conditions') as FormArray;
    const comparisonOpForm = conditionsForm.controls[index].get('comparison_op');

    const selectedVariables = this.selectedVariables[index];

    if (!selectedVariables.selected_options_condition_type_list) {
      selectedVariables.selected_options_condition_type_list = [];
    }

    if (comparisonOpForm.value != 'Entre' && selectedVariables.selected_options_condition_type_list.length >= 1) {
      this._notificationService.error('Para incluir mais de um valor utilize o Operador de Comparação "Entre".');
    }
    else if (comparisonOpForm.value != 'Entre' && selectedVariables.selected_options_condition_type_list.length == 0) {
      if (selectedVariables.selected_options_condition_type_list.find(f => f.id == event.option.value.id)) {
        this._notificationService.error('Não é possível selecionar um item que já exista na lista.');
      }
      else {
        selectedVariables.selected_options_condition_type_list.push(event.option.value);
        this.clearValue(index, false);
      }
    }
    else if (comparisonOpForm.value == 'Entre') {
      if (selectedVariables.selected_options_condition_type_list.find(f => f.id == event.option.value.id)) {
        this._notificationService.error('Não é possível selecionar um item que já exista na lista.');
      }
      else {
        selectedVariables.selected_options_condition_type_list.push(event.option.value);
        this.clearValue(index, false);
      }
    }

    setTimeout(() => {
      // this.autoComplete['_results'][index]._onChange('');
      // this.autoComplete['_results'][index].openPanel();
    });
  }

  clearValue(index: number, resetArray: boolean = true): void {
    const conditionsForm = this.form.get('conditions') as FormArray;
    const valueForm = conditionsForm.controls[index].get('value');

    this._el.nativeElement.querySelector(`#condition-value-${index}`).value = '';
    valueForm.setValue('');

    const selectedVariable = this.selectedVariables[index];

    selectedVariable.filtered_options_condition_type_list = selectedVariable.options_condition_type_list;

    if (resetArray) {
      this.selectedVariables[index].selected_options_condition_type_list = [];
    }

    setTimeout(() => {
      this._el.nativeElement.querySelector(`#condition-value-${index}`).focus();
    }, 100);
  }

  removeOptionConditionTypeList(indexCondition: number, indexOption: number): void {
    this.selectedVariables[indexCondition].selected_options_condition_type_list.splice(indexOption, 1);
  }

  onKeyupValue(event, index: number): void {
    const selectedVariable = this.selectedVariables[index];

    selectedVariable.filtered_options_condition_type_list =
      selectedVariable.options_condition_type_list.filter(f => f.description.toLowerCase().includes(event.target.value));
  }

  disableValueInput(index: number): boolean {
    const variable = this.selectedVariables[index];

    const conditionsForm = this.form.get('conditions') as FormArray;
    const comparisonOpForm = conditionsForm.controls[index].get('comparison_op');
    const valueForm = conditionsForm.controls[index].get('value');

    if (variable.data_type == VariableDataTypeEnum.LIST_OF_VALUE) {
      if (!comparisonOpForm.value) {
        valueForm.disable();
        return true;
      }
      if (comparisonOpForm.value != 'Entre' && variable.selected_options_condition_type_list && variable.selected_options_condition_type_list.length >= 1) {
        valueForm.disable();
        return false;
      }
      else {
        valueForm.enable();
        return false;
      }
    }
    else {
      valueForm.enable();
      return false;
    }
  }
}
