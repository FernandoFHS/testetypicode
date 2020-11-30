import { MonitoringRuleResponseMock } from 'src/app/mocks/monitoring-rule.response.mock';
import { MonitoringRuleModel } from '../monitoring-rule.model';
import { BaseResponseModel } from './base/base.response.model';

export class MonitoringRuleResponseModel extends BaseResponseModel {
  content: MonitoringRuleModel[];

  static mock(): MonitoringRuleResponseModel {
    return MonitoringRuleResponseMock;
  }
}