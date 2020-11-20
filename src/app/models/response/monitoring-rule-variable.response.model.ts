import { VariableDataTypeEnum } from 'src/app/enums/variable-data-type.enum';
import { MonitoringRuleVariableResponseMock } from 'src/app/mocks/monitoring-rule-variable.response.mock';
import { ConditionTypeListModel } from '../rules/condition-type-list.model';

export class MonitoringRuleVariableResponseModel {
  variable_name: string;
  display_name: string;
  data_type: VariableDataTypeEnum;
  comparison_operators: {
    operator_name: string;
    display_name: string;
  }[];
  options_condition_type_list: ConditionTypeListModel[];
  filtered_options_condition_type_list: ConditionTypeListModel[];
  selected_options_condition_type_list: ConditionTypeListModel[];
  is_loading_data: boolean;

  static mock(): MonitoringRuleVariableResponseModel[] {
    return MonitoringRuleVariableResponseMock;
  }
}