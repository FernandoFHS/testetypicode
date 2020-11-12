export class MonitoringRuleVariableResponseModel {
  variable_name: string;
  display_name: string;
  data_type: string;
  comparison_operators: [{
    operator_name: string;
    display_name: string;
  }]
}