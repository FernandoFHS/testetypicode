import { MonitoringRuleResponseMock } from 'src/app/mocks/monitoring-rule.response.mock';
import { BaseResponseModel } from './base/base.response.model';
import { MonitoringRuleConditionResponseModel } from './monitoring-rule-condition.response.model';

export class MonitoringRuleResponseModel extends BaseResponseModel {
  content: {
    active: boolean | string;
    block_merchant_transactions: boolean;
    created_at: string;
    critical_level: string;
    description: string;
    email_notification_mode: string;
    email_notification_recipients: string[];
    id: number;
    id_user_of_activation: number;
    monitoring_rule_condition: MonitoringRuleConditionResponseModel[];
    updated_at: string;
    rule_type: string;
  }[];

  static mock(): MonitoringRuleResponseModel {
    return MonitoringRuleResponseMock;
  }
}