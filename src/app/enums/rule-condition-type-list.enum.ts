export enum RuleConditionTypeListEnum {
  // List
  CNAE = 'CNAE',
  MCC = 'MCC',
  ACQUIRER = 'Adiquirente',
  INPUT_MODE = 'ModoEntrada',
  TYPE_SELL = 'TipoVenda',
  TRANSACTION_STATUS = 'StatusTransacao',
  RETURN_CODE = 'CodigoRetorno',

  // Others
  TRANSACTION_HOUR = 'HorarioTransacao',
  RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION = 'RecorrenciaMesmoEstabelecimentoEMesmoValorTransação',
  RECURRENCE_SAME_COMPANY_AND_VALUE_TRANSACTION_AND_CARD_NUMBER = 'RecorrenciaMesmoEstabelecimentoEMesmoValorEMesmoCartão',
  RECURRENCE_SAME_COMPANY_AND_CARD_NUMBER = 'RecorrenciaMesmoEstabelecimentoEMesmoCartão',
  VOLUME_PER_HOUR = 'VolumePorHora',
  MEDIUM_TICKET_PER_HOUR = 'TicketMedioPorHora'
}