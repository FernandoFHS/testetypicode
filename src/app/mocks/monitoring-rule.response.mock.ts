import { MonitoringRuleResponseModel } from '../models/responses/monitoring-rule.response.model';

export const MonitoringRuleResponseMock: MonitoringRuleResponseModel = {
  content: [
    {
      id: 1,
      description: "Reostaurantes c/ Vendas Acima de R$ 1000,00 em Estabelecimento c/ Ticket Medio Abaixo R$ 900,00",
      active: false,
      created_at: "11-11-2020 09:38:43",
      updated_at: "13-11-2020 09:12:09",
      block_merchant_transactions: true,
      email_notification_mode: "SEND_BY_HOUR",
      critical_level: "AVERAGE",
      id_user_of_activation: 44444,
      rule_type: "NORMAL",
      email_notification_recipients: ['teste@teste.com'],
      monitoring_rule_condition: [
        {
          id: 1,
          created_at: "11-11-2020 09:38:43",
          updated_at: "11-11-2020 09:38:43",
          variable_name: "TicketMedio",
          comparison_operator: ">",
          monetary_value: 100.0,
          numeric_without_decimal_places_value: 0,
          logical_operator: "&&",
          list_item_value: null,
          number_per_hour: null,
          value: null
        },
        {
          id: 2,
          created_at: "11-11-2020 09:38:43",
          updated_at: "11-11-2020 09:38:43",
          variable_name: "ValorTransacao",
          comparison_operator: ">=",
          monetary_value: 189.99,
          numeric_without_decimal_places_value: 0,
          logical_operator: "",
          list_item_value: null,
          number_per_hour: null,
          value: null
        }
      ]
    },
    {
      id: 2,
      description: "Reostaurantes c/ Vendas Acima de R$ 1000,00 em Estabelecimento c/ Ticket Medio Abaixo R$ 900,00",
      active: true,
      created_at: "13-11-2020 09:11:52",
      updated_at: "13-11-2020 09:11:52",
      block_merchant_transactions: true,
      email_notification_mode: "SEND_BY_HOUR",
      critical_level: "AVERAGE",
      id_user_of_activation: 44444,
      rule_type: "TRANSACTION_HOUR_RANGE",
      email_notification_recipients: [],
      monitoring_rule_condition: [
        {
          id: 3,
          created_at: "13-11-2020 09:11:52",
          updated_at: "13-11-2020 09:11:52",
          variable_name: "TicketMedioPorHora",
          comparison_operator: ">",
          monetary_value: 100.0,
          numeric_without_decimal_places_value: 0,
          logical_operator: "&&",
          list_item_value: null,
          number_per_hour: null,
          value: null
        },
        {
          id: 4,
          created_at: "13-11-2020 09:11:52",
          updated_at: "13-11-2020 09:11:52",
          variable_name: "ValorTransacao",
          comparison_operator: ">=",
          monetary_value: 189.99,
          numeric_without_decimal_places_value: 0,
          logical_operator: "",
          list_item_value: null,
          number_per_hour: null,
          value: null
        }
      ]
    }
  ],
  pageable: {
    sort: {
      unsorted: true,
      sorted: false,
      empty: true
    },
    offset: 0,
    pageSize: 15,
    pageNumber: 0,
    unpaged: false,
    paged: true
  },
  last: true,
  totalPages: 1,
  totalElements: 2,
  size: 15,
  number: 0,
  sort: {
    unsorted: true,
    sorted: false,
    empty: true
  },
  first: true,
  numberOfElements: 2,
  empty: false
};