import { MonitoringRuleVariableResponseModel } from '../models/response/monitoring-rule-variable.response.model';

export const MonitoringRuleVariableResponseMock: MonitoringRuleVariableResponseModel[] = [
  {
    variable_name: "ValorTransacao",
    display_name: "Valor transação",
    data_type: "Monetary",
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
    data_type: "ListOfValue",
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
    data_type: "ListOfValue",
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
    data_type: "ListOfValue",
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
    data_type: "ListOfValue",
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
    data_type: "ListOfValue",
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
    variable_name: "StatusTransação",
    display_name: "Status transação",
    data_type: "ListOfValue",
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
    variable_name: "CódigoRetorno",
    display_name: "Código retorno",
    data_type: "ListOfValue",
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
    variable_name: "HorárioTransação",
    display_name: "Horário transação",
    data_type: "ListOfValue",
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
    data_type: "ListOfValue",
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
    data_type: "ListOfValue",
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
    data_type: "ListOfValue",
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
    data_type: "Monetary",
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
    data_type: "Monetary",
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
    data_type: "Monetary",
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
    data_type: "Monetary",
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