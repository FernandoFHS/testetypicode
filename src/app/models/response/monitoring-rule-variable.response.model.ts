import { MonitoringRuleVariableResponseMock } from 'src/app/mocks/monitoring-rule-variable.response.mock';

export class MonitoringRuleVariableResponseModel {
  variable_name: string;
  display_name: string;
  data_type: string;
  comparison_operators: {
    operator_name: string;
    display_name: string;
  }[];

  static mock(): MonitoringRuleVariableResponseModel[] {
    return MonitoringRuleVariableResponseMock;
  }
}