import { ServiceEntityRequest } from './ServiceEntity';
import { PaymentMethodRequest } from './PaymentMethod';
import { PaymentDeadLineRequest } from './PaymentDeadLine';
import { CreditCardFlagRequest } from './CreditCardFlag';
import { AgreementRequest } from './Agreement';

export interface PlanRequest {
  sequentialRegistries: number,
  installment: number,
  percentAdmTax: number,
  percentFinancialTax: number,
  percentCreditTariff: number,
  transactionCostAmount: number,
  description: string,
  antecipationTax: number,
  value: number,
  idAgreement: number,
  idCreditCardFlag: number,
  idPaymentDeadLine: number,
  idPaymentMethod: number,
  idService: number
}
export interface PlanResponse {
  sequentialRegistries: number,
  installment: number,
  percentAdmTax: number,
  percentFinancialTax: number,
  percentCreditTariff: number,
  transactionCostAmount: number,
  description: string,
  antecipationTax: number,
  value: number,
  agreement: AgreementRequest,
  creditCardFlag: CreditCardFlagRequest,
  paymentDeadLine: PaymentDeadLineRequest,
  paymentMethod: PaymentMethodRequest,
  service: ServiceEntityRequest
}

export interface RootPlan {
  content: PlanResponse[],
  pageable: {
    sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
    },
    pageNumber: number,
    pageSize: number,
    offset: number,
    paged: boolean,
    unpaged: boolean
  },
  totalElements: number,
  last: boolean,
  totalPages: number,
  sort: {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
  },
  number: number,
  numberOfElements: number,
  first: boolean,
  size: number,
  empty: boolean
}