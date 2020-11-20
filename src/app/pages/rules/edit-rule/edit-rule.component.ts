import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { RuleTypeEnum } from 'src/app/enums/rule-type.enum';
import { VariableDataTypeEnum } from 'src/app/enums/variable-data-type.enum';
import { MonitoringRuleModel } from 'src/app/models/monitoring-rule.model';
import { MonitoringRuleChangeStatusRequestModel } from 'src/app/models/requests/monitoring-rule-change-status.request.model';
import { MonitoringRuleConditionRequestModel } from 'src/app/models/requests/monitoring-rule-condition.request.model';
import { MonitoringRuleUpdateRequestModel } from 'src/app/models/requests/monitoring-rule-update.request.model';
import { MonitoringRuleRequestModel } from 'src/app/models/requests/monitoring-rule.request.model';
import { MonitoringRuleConditionResponseModel } from 'src/app/models/response/monitoring-rule-condition.response.model';
import { MonitoringRuleVariableResponseModel } from 'src/app/models/response/monitoring-rule-variable.response.model';
import { GeneralService } from 'src/app/services/general.service';
import { MonitoringRuleService } from 'src/app/services/monitoring-rule.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-rule',
  templateUrl: './edit-rule.component.html',
  styleUrls: ['./edit-rule.component.scss']
})
export class EditRuleComponent implements OnInit {


  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Regra',
      route: 'rule'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Regras', route: 'rules' }
    ]
  };

  logicOperatorList: { text: string; value: string }[] = [{
    text: 'E',
    value: '&&'
  }, {
    text: 'OU',
    value: '||'
  }];

  emailSeparatorKeysCodes: number[] = [ENTER, COMMA];

  form: FormGroup;
  emails: string[] = [];
  variables: MonitoringRuleVariableResponseModel[] = [];
  selectedVariables: MonitoringRuleVariableResponseModel[] = [];
  model: MonitoringRuleModel;
  isLoading: boolean;
  id: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _monitoringRuleService: MonitoringRuleService,
    private _notificationService: NotificationService,
    private _el: ElementRef,
    private _spinnerService: NgxSpinnerService,
    private _router: Router,
    private _generalService: GeneralService,
    private _activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    await this._loadParams();
    await this._loadVariables();
    await this._loadModel();

    this._loadForm();

    this.isLoading = false;
  }

  private _loadParams(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._activatedRoute.params.subscribe((params) => {
        this.id = params['id'];

        if (this.id || this.id == 0) {
          resolve();
        }
        else {
          this._backWithError();
          reject();
        }
      });
    });
  }

  private _backWithError(): void {
    this.back();
    this._notificationService.error('Ops, houve um erro ao carregar Regra, tente novamente.');
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

  private _loadModel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._monitoringRuleService.getRuleById(this.id).then((model) => {
        this.model = model;

        if (this.model) {
          this.emails = this.model.email_notification_recipients;
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
      description: [this.model.description, [Validators.required]],
      conditions: this._formBuilder.array(this.model.monitoring_rule_condition.map((condition) => {
        const variable = this.variables.find(v => v.variable_name == condition.variable_name);
        this.selectedVariables.push(variable);
        return this._createCondition(condition);
      })),
      critical_level: [{ value: this.model.critical_level, disabled: true }, []],
      email_notification_mode: [this.model.email_notification_mode, []],
      block_merchant_transactions: [{ value: this.model.block_merchant_transactions, disabled: true }, []],
      email: [{ value: '', disabled: true }, [Validators.email]]
    });
  }

  private _createCondition(condition: MonitoringRuleConditionResponseModel = null): FormGroup {
    return this._formBuilder.group({
      logic_op: [{ value: condition ? condition.logical_operator : '&&', disabled: true }, []],
      variable: [{ value: condition ? condition.variable_name : '', disabled: true }, [Validators.required]],
      comparison_op: [{ value: condition ? condition.comparison_operator : '', disabled: true }, [Validators.required]],
      value: [{ value: condition ? this._getValue(condition) : '', disabled: true }, [Validators.required]]
    });
  }

  private _getValue(condition: MonitoringRuleConditionResponseModel): string {
    const variable = this.variables.find(v => v.variable_name == condition.variable_name);

    if (variable.data_type == VariableDataTypeEnum.MONETARY) {
      return condition.monetary_value.toString();
    }
    else if (variable.data_type == VariableDataTypeEnum.LIST_OF_VALUE) {
      return condition.numeric_without_decimal_places_value.toString();
    }
  }

  update(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this._spinnerService.show();

      const form = this.form.getRawValue();

      const request: MonitoringRuleUpdateRequestModel = {
        description: form.description,
        email_notification_mode: form.email_notification_mode,
        id: this.id
      };

      this._monitoringRuleService.update(request).then(() => {
        this.back();
        this._notificationService.success('Regra atualizada com sucesso.')
      }, (error) => {
        this._notificationService.error('Erro ao atualizar regra, tente novamente.');
      }).finally(() => {
        this._spinnerService.hide();
      });
    }
    else {
      this._notificationService.error('Formulário inválido.');
    }
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
        rule_type: RuleTypeEnum.NORMAL // TODO
      }

      this._monitoringRuleService.add(request).then((response) => {
        this._notificationService.success('Regra editada com sucesso.');
        this._router.navigate(['rules/list']);
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
    this._router.navigate(['rules/list']);
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
}
