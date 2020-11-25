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
import { ActivatedRoute, Router } from '@angular/router';
import { RuleTypeEnum } from 'src/app/enums/rule-type.enum';
import { RuleEmailNotificationModeEnum } from 'src/app/enums/rule-email-notification-mode.enum';
import { VariableDataTypeEnum } from 'src/app/enums/variable-data-type.enum';
import { ConditionTypeListModel } from 'src/app/models/rules/condition-type-list.model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { PageTypeEnum } from 'src/app/enums/page-type.enum';
import { MonitoringRuleModel } from 'src/app/models/monitoring-rule.model';
import { MonitoringRuleConditionResponseModel } from 'src/app/models/response/monitoring-rule-condition.response.model';
import { GeneralService } from 'src/app/services/general.service';
import { MonitoringRuleChangeStatusRequestModel } from 'src/app/models/requests/monitoring-rule-change-status.request.model';
import { RuleConditionTypeListEnum } from 'src/app/enums/rule-condition-type-list.enum';
import { RuleCriticalLevelEnum } from 'src/app/enums/rule-critical-level.enum';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  private _breadcrumbItems = [
    { title: 'Home', route: '' },
    { title: 'Lista de Regras', route: 'rules' }
  ];

  emailSeparatorKeysCodes: number[] = [ENTER, COMMA];

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

  viewBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Visualizar Regra',
      route: ''
    },
    items: this._breadcrumbItems
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

  pageType: PageTypeEnum;
  isLoading: boolean;
  id: number;
  model: MonitoringRuleModel;
  ruleAlreadyActivated: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _monitoringRuleService: MonitoringRuleService,
    private _notificationService: NotificationService,
    private _el: ElementRef,
    private _spinnerService: NgxSpinnerService,
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _generalService: GeneralService
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    // setInterval(() => {
    //   console.log('selected', this.selectedVariables);
    // }, 1000)

    await this._loadParams();
    await this._loadVariables();

    if (this.isPageEdit()) {
      await this._loadModel();
      await this._loadFormEdit();
    }
    else if (this.isPageView()) {
      await this._loadModel();
      await this._loadFormView();
    }
    else {
      this._loadFormAdd();
    }

    this.isLoading = false;
  }

  private _loadVariables(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._monitoringRuleService.getVariables().then((variables) => {
        this.variables = variables;
        resolve();
      }, (error) => {
        reject();
      });
    });
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

  private _backWithError(): void {
    this.back();
    this._notificationService.error('Ops, houve um erro ao carregar Regra, tente novamente.');
  }

  private _loadModel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._monitoringRuleService.getRuleById(this.id).then((model) => {
        this.model = model;

        if (this.model) {
          this.emails = this.model.email_notification_recipients;

          // TODO
          // this.ruleAlreadyActivated = this.model.id_user_of_activation > 0 || this.isPageView();
          this.ruleAlreadyActivated = this.model.active || this.isPageView() ? true : false;

          resolve();
        }
        else {
          this._backWithError();
          reject();
        }
      }, (error) => {
        this._backWithError();
        reject();
      });
    });
  }

  addCondition(): void {
    const conditions = this.form.get('conditions') as FormArray;
    conditions.push(this._createCondition());

    this.selectedVariables.push(new MonitoringRuleVariableResponseModel());
  }

  onChangeVariable(event: MatSelectChange, index: number, controlForms: boolean = true, listItemValueList: string[] = []): void {
    const conditionsForm = this.form.get('conditions') as FormArray;

    const variable = this._generalService.copyWithoutReferences<MonitoringRuleVariableResponseModel>(this.variables.find(v => v.variable_name == event.value));
    const comparisonOperatorForm = conditionsForm.controls[index].get('comparison_op');
    const valueForm = conditionsForm.controls[index].get('value');

    if (controlForms) {
      valueForm.disable();
      comparisonOperatorForm.enable();
      comparisonOperatorForm.setValue('');
    }

    if (this.selectedVariables[index]) {
      this.selectedVariables[index] = variable;
    }
    else {
      this.selectedVariables.push(variable);
    }

    const combinationIsValid = this._monitoringRuleService.validateCombinationOfVariables(this.selectedVariables);

    if (combinationIsValid) {
      if (variable.data_type == VariableDataTypeEnum.LIST_OF_VALUE) {
        this.selectedVariables[index].is_loading_data = true;

        this._monitoringRuleService.getRuleConditionListByEnum(variable.variable_name).then((data) => {
          if (data && data.length > 0) {
            variable.options_condition_type_list = data;
            variable.filtered_options_condition_type_list = data;

            if (!controlForms) {
              this.selectedVariables[index].selected_options_condition_type_list = data.filter(f => listItemValueList.find(f1 => f1 == f.id));
            }
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
    else {
      this.removeCondition(index, false, false);
    }
  }

  disableVariable(variable: MonitoringRuleVariableResponseModel): boolean {
    const variableAdded = this.selectedVariables.find(f => f.variable_name == variable.variable_name);

    if (variableAdded) {
      // return true; TODO
      return false;
    }
    else {
      return false;
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

  private _loadFormAdd(): void {
    this.form = this._formBuilder.group({
      description: ['', [Validators.required]],
      conditions: this._formBuilder.array([]),
      critical_level: [RuleCriticalLevelEnum.LOW, []],
      email_notification_mode: [RuleEmailNotificationModeEnum.SEND_FOR_ALL, []],
      block_merchant_transactions: [false, []],
      email: ['', [Validators.email]]
    });
  }

  private _loadFormEdit(): void {
    this.form = this._formBuilder.group({
      description: [this.model.description, [Validators.required]],
      conditions: this._formBuilder.array(this.model.monitoring_rule_condition.map((condition) => {
        // const variable = this.variables.find(v => v.variable_name == condition.variable_name);
        // this.selectedVariables.push(variable);
        return this._createCondition(condition);
      })),
      critical_level: [{ value: this.model.critical_level, disabled: this.ruleAlreadyActivated }, []],
      email_notification_mode: [this.model.email_notification_mode, []],
      block_merchant_transactions: [{ value: this.model.block_merchant_transactions, disabled: this.ruleAlreadyActivated }, []],
      email: [{ value: '', disabled: this.isPageView() }, [Validators.email]]
    });

    this.model.monitoring_rule_condition.forEach((condition, index) => {
      const variable = this.variables.find(v => v.variable_name == condition.variable_name);

      const event = <MatSelectChange>{
        value: variable.variable_name
      };

      this.onChangeVariable(event, index, false, condition.list_item_value?.split(',') || []);
    });
  }

  private _loadFormView(): void {
    this.form = this._formBuilder.group({
      description: [{ value: this.model.description, disabled: true }, []],
      conditions: this._formBuilder.array(this.model.monitoring_rule_condition.map((condition) => {
        // const variable = this.variables.find(v => v.variable_name == condition.variable_name);
        // this.selectedVariables.push(variable);
        return this._createCondition(condition);
      })),
      critical_level: [{ value: this.model.critical_level, disabled: true }, []],
      email_notification_mode: [{ value: this.model.email_notification_mode, disabled: true }, []],
      block_merchant_transactions: [{ value: this.model.block_merchant_transactions, disabled: true }, []],
      email: [{ value: '', disabled: true }, []]
    });

    this.model.monitoring_rule_condition.forEach((condition, index) => {
      const variable = this.variables.find(v => v.variable_name == condition.variable_name);

      const event = <MatSelectChange>{
        value: variable.variable_name
      };

      this.onChangeVariable(event, index, false, condition.list_item_value?.split(',') || []);
    });
  }

  private _createCondition(condition: MonitoringRuleConditionResponseModel = null): FormGroup {
    return this._formBuilder.group({
      logic_op: [{ value: condition ? condition.logical_operator : '&&', disabled: condition ? this.ruleAlreadyActivated : false }, []],
      variable: [{ value: condition ? condition.variable_name : '', disabled: condition ? this.ruleAlreadyActivated : false }, [Validators.required]],
      comparison_op: [{ value: condition ? condition.comparison_operator : '', disabled: condition ? this.ruleAlreadyActivated : true }, [Validators.required]],
      value: [{ value: condition ? this._getValue(condition) : '', disabled: condition ? this.ruleAlreadyActivated : true }, []]
    });
  }

  private _getValue(condition: MonitoringRuleConditionResponseModel): string {
    try {
      const variable = this.variables.find(v => v.variable_name == condition.variable_name);

      if (variable.data_type == VariableDataTypeEnum.MONETARY) {
        return condition.monetary_value.toString();
      }
      else if (variable.data_type == VariableDataTypeEnum.LIST_OF_VALUE) {
        return condition.numeric_without_decimal_places_value.toString();
      }
    }
    catch (error) {
      console.log(`Variável ${condition.variable_name} não encontrada na lista de variaveis!`, this.variables);
      return '';
    }
  }

  save(): void {
    this.form.markAllAsTouched();

    this.form.get('email').setValue('');

    if (this.form.valid) {
      const form = this.form.getRawValue();
      const formConditions = (this.form.get('conditions') as FormArray);

      if (formConditions.controls.length == 0) {
        this._notificationService.error('Formulário inválido, você deve informar pelo menos uma condição.')
      }
      else {
        this._spinnerService.show();

        const conditions: MonitoringRuleConditionRequestModel[] = [];

        for (let index = 0; index < formConditions.controls.length; index++) {
          const formCondition = formConditions.at(index);
          const selectedVariable = this.selectedVariables[index];

          const condition: MonitoringRuleConditionRequestModel = {
            comparison_operator: formCondition.get('comparison_op').value,
            created_at: '', // TODO
            id: 0, // TODO
            logical_operator: (index == formConditions.controls.length || formConditions.controls.length == 1) ? '' : formCondition.get('logic_op').value,
            list_item_value: selectedVariable.data_type == VariableDataTypeEnum.LIST_OF_VALUE ? selectedVariable.selected_options_condition_type_list.map(m => m.id).join(',') : null,
            monetary_value: selectedVariable.data_type == VariableDataTypeEnum.MONETARY ? formCondition.get('value').value : null,
            numeric_without_decimal_places_value: null,
            updated_at: '', // TODO
            number_per_hour: null,
            value: null, // TODO
            variable_name: formCondition.get('variable').value
          }

          conditions.push(condition);
        }

        const request: MonitoringRuleRequestModel = {
          active: false,
          block_merchant_transactions: form.block_merchant_transactions,
          created_at: '', // TODO
          critical_level: form.critical_level,
          description: form.description,
          email_notification_mode: form.email_notification_mode,
          email_notification_recipients: this.emails || [],
          id: 0, // TODO
          id_user_of_activation: 0, // TODO
          monitoring_rule_condition: conditions,
          updated_at: '', // TODO
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
    }
    else {
      this._notificationService.error('Formulário inválido.');
    }
  }

  update(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const form = this.form.getRawValue();
      const formConditions = (this.form.get('conditions') as FormArray);

      if (formConditions.controls.length == 0) {
        this._notificationService.error('Formulário inválido, você deve informar pelo menos uma condição.')
      }
      else {
        this._spinnerService.show();

        const conditions: MonitoringRuleConditionRequestModel[] = [];

        for (let index = 0; index < formConditions.controls.length; index++) {
          const formCondition = formConditions.at(index);
          const selectedVariable = this.selectedVariables[index];

          const condition: MonitoringRuleConditionRequestModel = {
            comparison_operator: formCondition.get('comparison_op').value,
            created_at: '', // TODO
            id: 0, // TODO
            logical_operator: (index == formConditions.controls.length || formConditions.controls.length == 1) ? '' : formCondition.get('logic_op').value,
            list_item_value: selectedVariable.data_type == VariableDataTypeEnum.LIST_OF_VALUE ? selectedVariable.selected_options_condition_type_list.map(m => m.id).join(',') : null,
            monetary_value: selectedVariable.data_type == VariableDataTypeEnum.MONETARY ? formCondition.get('value').value : null,
            numeric_without_decimal_places_value: null,
            updated_at: '', // TODO
            number_per_hour: null,
            value: null, // TODO
            variable_name: formCondition.get('variable').value
          }

          conditions.push(condition);
        }

        const request: MonitoringRuleRequestModel = {
          active: this.model.active,
          block_merchant_transactions: form.block_merchant_transactions,
          created_at: this.model.created_at,
          critical_level: form.critical_level,
          description: form.description,
          email_notification_mode: form.email_notification_mode,
          email_notification_recipients: this.emails || [],
          id: this.model.id,
          id_user_of_activation: this.model.id_user_of_activation,
          monitoring_rule_condition: conditions,
          updated_at: '', // TODO
          rule_type: RuleTypeEnum.NORMAL // TODO
        }

        this._monitoringRuleService.update(request).then(() => {
          this.back();
          this._notificationService.success('Regra atualizada com sucesso.')
        }, (error) => {
          this._notificationService.error('Erro ao atualizar regra, tente novamente.');
        }).finally(() => {
          this._spinnerService.hide();
        });
      }
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

    if (selectedVariable.variable_name == RuleConditionTypeListEnum.CNAE || selectedVariable.variable_name == RuleConditionTypeListEnum.MCC) {
      selectedVariable.filtered_options_condition_type_list =
        selectedVariable.options_condition_type_list.filter(f => f.description.toLowerCase().includes(event.target.value) || f.code.includes(event.target.value));
    }
    else {
      selectedVariable.filtered_options_condition_type_list =
        selectedVariable.options_condition_type_list.filter(f => f.description.toLowerCase().includes(event.target.value));
    }
  }

  disableValueInput(index: number): boolean {
    const variable = this.selectedVariables[index];

    const conditionsForm = this.form.get('conditions') as FormArray;
    const comparisonOpForm = conditionsForm.controls[index].get('comparison_op');
    const valueForm = conditionsForm.controls[index].get('value');

    if (this.isPageView() || this.ruleAlreadyActivated) {
      valueForm.disable();
      return true;
    }
    else {
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

  isPageEdit(): boolean {
    return this.pageType == PageTypeEnum.EDIT;
  }

  isPageAdd(): boolean {
    return this.pageType == PageTypeEnum.ADD;
  }

  isPageView(): boolean {
    return this.pageType == PageTypeEnum.VIEW;
  }

  active(): void {
    const message = 'Após a ativação da regra não será possível alterar as informações de geração de alertas como a criticidade, variáveis e bloqueio operacional. Tem certeza que deseja continuar?';

    this._generalService.openConfirmDialog(message, () => {
      this._spinnerService.show();

      const request: MonitoringRuleChangeStatusRequestModel = {
        active: true,
        id: this.id
      };

      this._monitoringRuleService.changeStatus(request).then(() => {
        this._router.navigate(['rules']);
        this._notificationService.success('Regra ativada com sucesso.');
      }, (error) => {
        this.back();
        this._notificationService.error('Erro ao ativar regra, tente novamente.');
      }).finally(() => {
        this._spinnerService.hide();
      });
    }, () => {
    }, 'Ativar Regra');
  }

  inactive(): void {
    const message = 'Tem certeza que deseja continuar?';

    this._generalService.openConfirmDialog(message, () => {
      this._spinnerService.show();

      const request: MonitoringRuleChangeStatusRequestModel = {
        active: false,
        id: this.id
      };

      this._monitoringRuleService.changeStatus(request).then(() => {
        this._router.navigate(['rules']);
        this._notificationService.success('Regra inativada com sucesso.');
      }, (error) => {
        this.back();
        this._notificationService.error('Erro ao inativar regra, tente novamente.');
      }).finally(() => {
        this._spinnerService.hide();
      });
    }, () => {
    }, 'Inativar Regra');
  }

  removeCondition(index: number, showConfirmDialog: boolean, deleteControl: boolean): void {
    const deleteFn = () => {
      let conditionsForm = this.form.get('conditions') as FormArray;

      if (deleteControl) {
        this.selectedVariables.splice(index, 1);
        conditionsForm.removeAt(index);
      }
      else {
        this.selectedVariables[index] = new MonitoringRuleVariableResponseModel();

        const valueForm = conditionsForm.controls[index].get('value');
        const variableForm = conditionsForm.controls[index].get('variable');
        const comparisonOpForm = conditionsForm.controls[index].get('comparison_op');
        const logicOpForm = conditionsForm.controls[index].get('logic_op');

        variableForm.setValue('');

        valueForm.setValue('');
        valueForm.disable();

        comparisonOpForm.setValue('');
        comparisonOpForm.disable();

        logicOpForm.setValue('');
        logicOpForm.disable();
      }
    };

    if (showConfirmDialog) {
      this._generalService.openConfirmDialog('Tem certeza que deseja excluir a condição?', () => {
        deleteFn()
      }, () => {
        // no
      }, 'Excluir Condição');
    }
    else {
      deleteFn();
    }
  }
}
