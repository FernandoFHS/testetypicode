import { RuleCriticalLevelEnum } from 'src/app/enums/rule-critical-level.enum';
import { RuleTypeEnum } from 'src/app/enums/rule-type.enum';
import { MonitoringRuleConditionRequestModel } from './monitoring-rule-condition.request.model';

export class MonitoringRuleRequestModel {
  active: boolean | string;
  block_merchant_transactions: boolean;
  created_at: string;
  critical_level: RuleCriticalLevelEnum;
  description: string;
  email_notification_mode: string;
  email_notification_recipients: string[];
  id: number;
  id_user_of_activation: number;
  monitoring_rule_condition: MonitoringRuleConditionRequestModel[];
  updated_at: string;
  rule_type: RuleTypeEnum;
}