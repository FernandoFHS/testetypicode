import { VariableDataTypeEnum } from 'src/app/enums/variable-data-type.enum';
import { MonitoringRuleVariableResponseMock } from 'src/app/mocks/monitoring-rule-variable.response.mock';

export class MonitoringRuleVariableResponseModel {
  variable_name: string;
  display_name: string;
  data_type: VariableDataTypeEnum;
  comparison_operators: {
    operator_name: string;
    display_name: string;
  }[];

  static mock(): MonitoringRuleVariableResponseModel[] {
    return MonitoringRuleVariableResponseMock;
  }
}