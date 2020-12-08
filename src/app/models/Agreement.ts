export interface AgreementRequest{
  id: number;
  idBusiness: number,
  description: string,
  saleType: number,
  isPartnerBF: boolean,
  idAcquirer: number
}

export interface AgreementContent{
  id: number;
  idCompany: number,
  description: string,
  saleType: number,
  isFastInstallments: boolean,
  migration: number
}

export interface AgreementResponse{
  id: number,
  idCompany: number,
  description: string,
  saleType: any,
  isFastInstallments: false,
  plans: [
    {
      id: number,
      numberOfInstallments: number,
      tax: [
        {
          id: number,
          installment: number,
          percentAdmTax: number,
          percentFinancialTax: number,
          percentCreditTariff: number,
          transactionCostAmount: number,
          antecipationTax: number,
          value: number,
          paymentDeadLine: {
            id: number,
            description: string,
            deadLineType: string,
            days: number,
            code: string
          },
          paymentMethod: {
            id: number,
            description: string,
            acronym: string
          }
        }
      ],
      creditCardFlag: any,
      remuneration: any,
      remunerationType: any,
      acquirer: any,
      agreement: {
        idAgreement: any
      }
    }
  ],
  migration: null
}