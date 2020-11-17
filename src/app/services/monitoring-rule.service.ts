import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MonitoringRuleModel } from '../models/monitoring-rule.model';
import { MonitoringRuleRequestModel } from '../models/requests/monitoring-rule.request.model';
import { MonitoringRuleVariableResponseModel } from '../models/response/monitoring-rule-variable.response.model';
import { MonitoringRuleResponseModel } from '../models/response/monitoring-rule.response.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoringRuleService {

  private rule_to_edit: MonitoringRuleModel;

  constructor(
    private _http: HttpClient
  ) { }

  setRuleToEdit(model: MonitoringRuleModel): void {
    this.rule_to_edit = model;
  }

  getRuleToEdit(): MonitoringRuleModel {
    if (this.rule_to_edit) {
      switch (this.rule_to_edit.critical_level) {
        case 'Baixa':
          this.rule_to_edit.critical_level = 'LOW';
          break;
        case 'Normal':
          this.rule_to_edit.critical_level = 'MEDIUM';
          break;
        case 'Alta':
          this.rule_to_edit.critical_level = 'AVERAGE';
          break;
      }
    }

    return this.rule_to_edit;
  }

  getRuleById(id: number): Promise<MonitoringRuleModel> {
    return new Promise<MonitoringRuleModel>((resolve, reject) => {
      try {
        if (environment.api.mock) {
          resolve(MonitoringRuleResponseModel.mock().content.find(f => f.id == id));
        }
        else {
          this._http.get(`${environment.api.url}/monitoring-rule/${id}`).subscribe((response: MonitoringRuleModel) => {
            console.log(response, 'response');
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
}
