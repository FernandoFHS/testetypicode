import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RuleConditionTypeListEnum } from '../enums/rule-condition-type-list.enum';
import { TransactionTypeEnum } from '../enums/transaction-status.enum';
import { MonitoringRuleModel } from '../models/monitoring-rule.model';
import { MonitoringRuleChangeStatusRequestModel } from '../models/requests/monitoring-rule-change-status.request.model';
import { MonitoringRuleUpdateRequestModel } from '../models/requests/monitoring-rule-update.request.model';
import { MonitoringRuleRequestModel } from '../models/requests/monitoring-rule.request.model';
import { MonitoringRuleVariableResponseModel } from '../models/response/monitoring-rule-variable.response.model';
import { MonitoringRuleResponseModel } from '../models/response/monitoring-rule.response.model';
import { ConditionTypeListModel } from '../models/rules/condition-type-list.model';
import { RuleConditionTypeListModel } from '../models/rules/rule-condition-type-list.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class MonitoringRuleService {

  private _ruleToEdit: MonitoringRuleModel;
  private _ruleConditionTypeList: RuleConditionTypeListModel;

  constructor(
    private _http: HttpClient,
    private _generalService: GeneralService
  ) { }

  setRuleConditionTypeList(model: RuleConditionTypeListModel): void {
    this._ruleConditionTypeList = model;
  }

  getRuleConditionTypeList(): RuleConditionTypeListModel {
    return this._ruleConditionTypeList;
  }

  setRuleToEdit(model: MonitoringRuleModel): void {
    this._ruleToEdit = model;
  }

  getRuleToEdit(): MonitoringRuleModel {
    if (this._ruleToEdit) {
      switch (this._ruleToEdit.critical_level) {
        case 'Baixa':
          this._ruleToEdit.critical_level = 'LOW';
          break;
        case 'Normal':
          this._ruleToEdit.critical_level = 'MEDIUM';
          break;
        case 'Alta':
          this._ruleToEdit.critical_level = 'AVERAGE';
          break;
      }
    }

    return this._ruleToEdit;
  }

  getRuleById(id: number): Promise<MonitoringRuleModel> {
    return new Promise<MonitoringRuleModel>((resolve, reject) => {
      try {
        if (environment.api.mock) {
          resolve(MonitoringRuleResponseModel.mock().content.find(f => f.id == id));
        }
        else {
          this._http.get(`${environment.api.url}/monitoring-rule/${id}`).subscribe((response: MonitoringRuleModel) => {
            resolve(response);
          }, (error) => {
            console.log('-- Erro  na chamada monitoring-rule.service.ts função getRuleById');
            console.log(error);
            reject(error);
          });
        }
      }
      catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getRules(page: number, size: number): Promise<MonitoringRuleResponseModel> {
    return new Promise<MonitoringRuleResponseModel>((resolve, reject) => {
      try {
        if (environment.api.mock) {
          resolve(MonitoringRuleResponseModel.mock());
        }
        else {
          this._http.get(`${environment.api.url}/monitoring-rule?page=${page}&size=${size}`).subscribe((response: MonitoringRuleResponseModel) => {
            resolve(response);
          }, (error) => {
            console.log('-- Erro  na chamada monitoring-rule.service.ts função getRules');
            console.log(error);
            reject(error);
          });
        }
      }
      catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getVariables(): Promise<MonitoringRuleVariableResponseModel[]> {
    return new Promise<MonitoringRuleVariableResponseModel[]>((resolve, reject) => {
      try {
        if (environment.api.mock) {
          resolve(MonitoringRuleVariableResponseModel.mock());
        }
        else {
          this._http.get(`${environment.api.url}/monitoring-rule/variables`).subscribe((response: MonitoringRuleVariableResponseModel[]) => {
            resolve(response);
          }, (error) => {
            console.log('-- Erro  na chamada monitoring-rule.service.ts função getVariables');
            console.log(error);
            reject(error);
          });
        }
      }
      catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  add(request: MonitoringRuleRequestModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this._http.post(`${environment.api.url}/monitoring-rule`, request).subscribe((response: any) => {
          resolve(response);
        }, (error) => {
          console.log('-- Erro  na chamada monitoring-rule.service.ts função add');
          console.log(error);
          reject(error);
        });
      }
      catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  changeStatus(request: MonitoringRuleChangeStatusRequestModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this._http.put(`${environment.api.url}/monitoring-rule/status`, request).subscribe((response) => {
          resolve();
        }, (error) => {
          console.log('-- Erro  na chamada monitoring-rule.service.ts função changeStatus');
          console.log(error);
          reject(error);
        });
      }
      catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  update(request: MonitoringRuleUpdateRequestModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this._http.put(`${environment.api.url}/monitoring-rule`, request).subscribe((response) => {
          resolve();
        }, (error) => {
          console.log('-- Erro  na chamada monitoring-rule.service.ts função update');
          console.log(error);
          reject(error);
        });
      }
      catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getRuleConditionListByEnum(conditionType: RuleConditionTypeListEnum | string): Promise<ConditionTypeListModel[]> {
    return new Promise<ConditionTypeListModel[]>((resolve, reject) => {
      try {
        switch (conditionType) {
          case RuleConditionTypeListEnum.ACQUIRER:
            if (this._ruleConditionTypeList != null && this._ruleConditionTypeList.acquirer_list) {
              resolve(this._ruleConditionTypeList.acquirer_list);
            }
            else {
              this._http.get(`${environment.bff.url_2}/acquirer?paged=false`).subscribe((data: { content: { id: number, code: number, description: string }[] }) => {

                if (data && data.content) {
                  const response: ConditionTypeListModel[] = data.content.map(item => {
                    return {
                      description: item.description,
                      disabled: false,
                      id: item.id,
                      code: ''
                    };
                  });

                  this._ruleConditionTypeList = {
                    ...this._ruleConditionTypeList,
                    acquirer_list: response
                  };

                  this.setRuleConditionTypeList(this._ruleConditionTypeList);

                  resolve(response);
                }
                else {
                  resolve([]);
                }

              }, (error) => {
                console.log('Erro ao chamar API de Adquirentes');
                console.log(error);
                reject();
              });
            }

            break;
          case RuleConditionTypeListEnum.CNAE:
            if (this._ruleConditionTypeList != null && this._ruleConditionTypeList.cnae_list) {
              resolve(this._ruleConditionTypeList.cnae_list);
            }
            else {
              this._http.get(`${environment.bff.url}/cnae?paged=false`).subscribe((data: { content: { idCnae: number, code: string, description: string }[] }) => {

                if (data && data.content) {
                  const response: ConditionTypeListModel[] = data.content.map(item => {
                    return {
                      description: item.description,
                      disabled: false,
                      id: item.idCnae,
                      code: item.code
                    };
                  });

                  this._ruleConditionTypeList = {
                    ...this._ruleConditionTypeList,
                    cnae_list: response
                  };

                  this.setRuleConditionTypeList(this._ruleConditionTypeList);

                  resolve(response);
                }
                else {
                  resolve([]);
                }

              }, (error) => {
                console.log('Erro ao chamar API de CNAE');
                console.log(error);
                reject();
              });
            }

            break;
          case RuleConditionTypeListEnum.INPUT_MODE:
            if (this._ruleConditionTypeList != null && this._ruleConditionTypeList.input_mode_list) {
              resolve(this._ruleConditionTypeList.input_mode_list);
            }
            else {
              let params = new HttpParams();
              params = params.append('page', '0');
              params = params.append('size', '999999999');

              this._http.get(`${environment.api.url}/monitoring-rules/transactions/entry-mode`, {
                params: params
              }).subscribe((data: { content: { id: number, disabled: boolean, description: string }[] }) => {

                if (data && data.content) {
                  const response: ConditionTypeListModel[] = data.content.filter(item => !item.disabled).map(item => {
                    return {
                      description: item.description,
                      disabled: item.disabled,
                      id: item.id,
                      code: ''
                    };
                  });

                  this._ruleConditionTypeList = {
                    ...this._ruleConditionTypeList,
                    input_mode_list: response
                  };

                  this.setRuleConditionTypeList(this._ruleConditionTypeList);

                  resolve(response);
                }
                else {
                  resolve([]);
                }

              }, (error) => {
                console.log('Erro ao chamar API de Modo de Entrada');
                console.log(error);
                reject();
              });
            }

            break;
          case RuleConditionTypeListEnum.MCC:
            if (this._ruleConditionTypeList != null && this._ruleConditionTypeList.mcc_list) {
              resolve(this._ruleConditionTypeList.mcc_list);
            }
            else {
              this._http.get(`${environment.bff.url}/mcc?paged=false`).subscribe((data: { content: { id: number, code: string, description: string }[] }) => {

                if (data && data.content) {
                  const response: ConditionTypeListModel[] = data.content.map(item => {
                    return {
                      description: item.description,
                      disabled: false,
                      id: item.id,
                      code: item.code
                    };
                  });

                  this._ruleConditionTypeList = {
                    ...this._ruleConditionTypeList,
                    mcc_list: response
                  };

                  this.setRuleConditionTypeList(this._ruleConditionTypeList);

                  resolve(response);
                }
                else {
                  resolve([]);
                }

              }, (error) => {
                console.log('Erro ao chamar API de CNAE');
                console.log(error);
                reject();
              });
            }

            break;
          case RuleConditionTypeListEnum.RETURN_CODE:
            if (this._ruleConditionTypeList != null && this._ruleConditionTypeList.return_code_list) {
              resolve(this._ruleConditionTypeList.return_code_list);
            }
            else {
              let params = new HttpParams();
              params = params.append('page', '0');
              params = params.append('size', '999999999');

              this._http.get(`${environment.api.url}/monitoring-rules/transactions/transaction-return-code`, {
                params: params
              }).subscribe((data: { content: { id: number, disabled: boolean, description: string }[] }) => {

                if (data && data.content) {
                  const response: ConditionTypeListModel[] = data.content.filter(item => !item.disabled).map(item => {
                    return {
                      description: item.description,
                      disabled: item.disabled,
                      id: item.id,
                      code: ''
                    };
                  });

                  this._ruleConditionTypeList = {
                    ...this._ruleConditionTypeList,
                    return_code_list: response
                  };

                  this.setRuleConditionTypeList(this._ruleConditionTypeList);

                  resolve(response);
                }
                else {
                  resolve([]);
                }

              }, (error) => {
                console.log('Erro ao chamar API de Código Retorno');
                console.log(error);
                reject();
              });
            }

            break;
          case RuleConditionTypeListEnum.TRANSACTION_STATUS:
            if (this._ruleConditionTypeList != null && this._ruleConditionTypeList.transaction_status_list) {
              resolve(this._ruleConditionTypeList.transaction_status_list);
            }
            else {
              const response: ConditionTypeListModel[] = [{
                id: TransactionTypeEnum.AUTHORIZED,
                description: 'Aprovada',
                disabled: false,
                code: ''
              }, {
                id: TransactionTypeEnum.REFUNDED,
                description: 'Estornada',
                disabled: false,
                code: ''
              }, {
                id: TransactionTypeEnum.REFUSED,
                description: 'Rejeitada',
                disabled: false,
                code: ''
              }];

              this._ruleConditionTypeList = {
                ...this._ruleConditionTypeList,
                transaction_status_list: response
              };

              this.setRuleConditionTypeList(this._ruleConditionTypeList);

              resolve(response);
            }

            break;
          case RuleConditionTypeListEnum.TYPE_SELL:
            if (this._ruleConditionTypeList != null && this._ruleConditionTypeList.type_sell_list) {
              resolve(this._ruleConditionTypeList.type_sell_list);
            }
            else {
              let params = new HttpParams();
              params = params.append('page', '0');
              params = params.append('size', '999999999');

              this._http.get(`${environment.api.url}/monitoring-rules/transactions/transaction-type`, {
                params: params
              }).subscribe((data: { content: { id: number, disabled: boolean, description: string }[] }) => {

                if (data && data.content) {
                  const response: ConditionTypeListModel[] = data.content.filter(item => !item.disabled).map(item => {
                    return {
                      description: item.description,
                      disabled: item.disabled,
                      id: item.id,
                      code: ''
                    };
                  });

                  this._ruleConditionTypeList = {
                    ...this._ruleConditionTypeList,
                    type_sell_list: response
                  };

                  this.setRuleConditionTypeList(this._ruleConditionTypeList);

                  resolve(response);
                }
                else {
                  resolve([]);
                }

              }, (error) => {
                console.log('Erro ao chamar API de Tipo de Venda');
                console.log(error);
                reject();
              });
            }

            break;
          default:
            console.log(`Condição (lista): ${conditionType} não encontrada.`);
            reject();
        }
      }
      catch (error) {
        console.log('-- Erro  na chamada monitoring-rule.service.ts função getRuleConditionList');
        reject();
      }
    });
  }

  validateCombinationOfVariables(selectedVariables: MonitoringRuleVariableResponseModel[]): boolean {
    const showError = (v1Invalid: string[], v2Invalid: string[]) => {
      const msgError = 'Combinação da variáveis inválida, não é possível incluir as variáveis';

      const v1 = selectedVariables.find(f => v1Invalid.includes(f.variable_name));
      const v2 = selectedVariables.find(f => v2Invalid.includes(f.variable_name));

      this._generalService.openOkDialog(`${msgError}: "${v1.display_name}" e "${v2.display_name}" juntas na mesma regra.`, () => { }, 'Variável inválida');
    };

    const variableTransactionHour: string[] = [
      RuleConditionTypeListEnum.TRANSACTION_HOUR
    ];

    const variableTransactionHourInvalid: string[] = [
      RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION,
      RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION_AND_CARD_NUMBER,
      RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_CARD_NUMBER,
      RuleConditionTypeListEnum.VOLUME_PER_HOUR,
      RuleConditionTypeListEnum.MEDIUM_TICKET_PER_HOUR
    ];

    if (
      selectedVariables.find(f => variableTransactionHour.includes(f.variable_name)) &&
      selectedVariables.find(f => variableTransactionHourInvalid.includes(f.variable_name))
    ) {
      showError(variableTransactionHour, variableTransactionHourInvalid);
      return false;
    }
    else if (
      selectedVariables.find(f => f.variable_name?.includes(RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_CARD_NUMBER)) &&
      selectedVariables.find(f => f.variable_name?.includes(RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION))
    ) {
      showError([RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_CARD_NUMBER], [RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION]);
      return false;
    }
    else if (
      selectedVariables.find(f => f.variable_name?.includes(RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_CARD_NUMBER)) &&
      selectedVariables.find(f => f.variable_name?.includes(RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION_AND_CARD_NUMBER))
    ) {
      showError([RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_CARD_NUMBER], [RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION_AND_CARD_NUMBER]);
      return false;
    }
    else if (
      selectedVariables.find(f => f.variable_name?.includes(RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION)) &&
      selectedVariables.find(f => f.variable_name?.includes(RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION_AND_CARD_NUMBER))
    ) {
      showError([RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION], [RuleConditionTypeListEnum.RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION_AND_CARD_NUMBER]);
      return false;

    }
    else {
      return true;
    }
  }
}
