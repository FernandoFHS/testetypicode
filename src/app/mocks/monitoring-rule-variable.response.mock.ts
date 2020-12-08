import { VariableDataTypeEnum } from '../enums/variable-data-type.enum';
import { MonitoringRuleVariableResponseModel } from '../models/response/monitoring-rule-variable.response.model';

export const MonitoringRuleVariableResponseMock: MonitoringRuleVariableResponseModel[] = [
  {
    variable_name: "ValorTransacao",
    display_name: "Valor transação",
    data_type: VariableDataTypeEnum.MONETARY,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Igual",
        display_name: "="
      },
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      },
      {
        operator_name: "Menor",
        display_name: "<"
      },
      {
        operator_name: "MenorOuIgual",
        display_name: "<="
      },
      {
        operator_name: "Diferente",
        display_name: "<>"
      }
    ]
  },
  {
    variable_name: "Adiquirente",
    display_name: "Adiquirente",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Igual",
        display_name: "="
      },
      {
        operator_name: "Diferente",
        display_name: "<>"
      },
      {
        operator_name: "Entre",
        display_name: "Entre"
      }
    ]
  },
  {
    variable_name: "CNAE",
    display_name: "CNAE",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Igual",
        display_name: "="
      },
      {
        operator_name: "Diferente",
        display_name: "<>"
      },
      {
        operator_name: "Entre",
        display_name: "Entre"
      }
    ]
  },
  {
    variable_name: "MCC",
    display_name: "MCC",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Igual",
        display_name: "="
      },
      {
        operator_name: "Diferente",
        display_name: "<>"
      },
      {
        operator_name: "Entre",
        display_name: "Entre"
      }
    ]
  },
  {
    variable_name: "ModoEntrada",
    display_name: "Modo de entrada",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Igual",
        display_name: "="
      },
      {
        operator_name: "Diferente",
        display_name: "<>"
      },
      {
        operator_name: "Entre",
        display_name: "Entre"
      }
    ]
  },
  {
    variable_name: "TipoVenda",
    display_name: "Tipo de venda",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Igual",
        display_name: "="
      },
      {
        operator_name: "Diferente",
        display_name: "<>"
      },
      {
        operator_name: "Entre",
        display_name: "Entre"
      }
    ]
  },
  {
    variable_name: "StatusTransacao",
    display_name: "Status transação",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Igual",
        display_name: "="
      },
      {
        operator_name: "Diferente",
        display_name: "<>"
      },
      {
        operator_name: "Entre",
        display_name: "Entre"
      }
    ]
  },
  {
    variable_name: "CodigoRetorno",
    display_name: "Código retorno",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Igual",
        display_name: "="
      },
      {
        operator_name: "Diferente",
        display_name: "<>"
      },
      {
        operator_name: "Entre",
        display_name: "Entre"
      }
    ]
  },
  {
    variable_name: "HorarioTransacao",
    display_name: "Horário transação",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "Menor",
        display_name: "<"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      },
      {
        operator_name: "MenorOuIgual",
        display_name: "<="
      }
    ]
  },
  {
    variable_name: "RecorrenciaMesmoEstabelecimentoEMesmoValorTransação",
    display_name: "Recorrencia mesmo estabelecimento e mesmo valor transação",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      }
    ]
  },
  {
    variable_name: "RecorrenciaMesmoEstabelecimentoEMesmoValorEMesmoCartão",
    display_name: "Recorrencia mesmo estabelecimento e mesmo Valor e mesmo cartão",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      }
    ]
  },
  {
    variable_name: "RecorrenciaMesmoEstabelecimentoEMesmoCartão",
    display_name: "Recorrencia mesmo estabelecimento e mesmo cartão",
    data_type: VariableDataTypeEnum.LIST_OF_VALUE,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      }
    ]
  },
  {
    variable_name: "Volume",
    display_name: "Volume",
    data_type: VariableDataTypeEnum.MONETARY,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      }
    ]
  },
  {
    variable_name: "VolumePorHora",
    display_name: "Volume por hora",
    data_type: VariableDataTypeEnum.MONETARY,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      }
    ]
  },
  {
    variable_name: "TicketMedio",
    display_name: "Ticket médio",
    data_type: VariableDataTypeEnum.MONETARY,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      }
    ]
  },
  {
    variable_name: "TicketMedioPorHora",
    display_name: "Ticket médio por hora",
    data_type: VariableDataTypeEnum.MONETARY,
    options_condition_type_list: [],
    is_loading_data: false,
    selected_options_condition_type_list: [],
    filtered_options_condition_type_list: [],
    comparison_operators: [
      {
        operator_name: "Maior",
        display_name: ">"
      },
      {
        operator_name: "MaiorOuIgual",
        display_name: ">="
      }
    ]
  }
]