import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MonitoringRuleRequestModel } from '../models/requests/monitoring-rule.request.model';
import { MonitoringRuleVariableResponseModel } from '../models/response/monitoring-rule-variable.response.model';
import { MonitoringRuleResponseModel } from '../models/response/monitoring-rule.response.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoringRuleService {

  constructor(
    private _http: HttpClient
  ) { }

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
