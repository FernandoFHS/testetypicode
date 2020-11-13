import { BaseResponseModel } from './base/base.response.model';

export class MonitoringRuleResponseModel extends BaseResponseModel {
  content: [{
    active: boolean | string;
    block_merchant_transactions: boolean;
    createdAt: string;
    critical_level: string;
    description: string;
    email_notification_mode: string;
    email_notification_recipients: string[];
    id: number;
    id_user_of_activation: number;
    monitoring_rule_condition: MonitoringRuleResponseModel[];
    updatedAt: string;
  }]
}