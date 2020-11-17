import { RuleTypeEnum } from 'src/app/enums/rule-type.enum';
import { MonitoringRuleConditionRequestModel } from './monitoring-rule-condition.request.model';

export class MonitoringRuleRequestModel {
  active: boolean;
  block_merchant_transactions: boolean;
  createdAt: string;
  critical_level: string;
  description: string;
  email_notification_mode: string;
  email_notification_recipients: string[];
  id: number;
  id_user_of_activation: number;
  monitoring_rule_condition: MonitoringRuleConditionRequestModel[];
  updatedAt: string;
  rule_type: RuleTypeEnum;
}