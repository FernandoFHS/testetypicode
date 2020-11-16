export class Mcc {
  id: number;
  code: string;
  description: string;
}

export class Cnae {
  idCnae: number;
  mcc: Mcc;
  description: string;
  descGroup: string;
}

export class Content {
  idCompany: number;
  companyAddress: any[];
  companyContact: any[];
  migration?: any;
  cnae: Cnae;
  email?: any;
  registrationDate?: any;
  gpSendDate?: any;
  accreditationDate: string;
  discreditationDate?: any;
  salesTableNumber?: any;
  companyStatus?: any;
  userInclusionCode?: any;
  inclusionRegistrationDateTime?: any;
  userChangeCode?: any;
  recordChangeDateTime?: any;
  automaticCreditIndicator?: any;
  seRegistrationDate?: any;
  referentialTransactionAmount?: any;
  posBillingTypeRental?: any;
  posChargeAmountRental?: any;
  tradingPartnerCode?: any;
  idTerminal?: any;
  logicalNumber?: any;
  gpAffiliationDate?: any;
  rentalExemptionDays?: any;
  registerCode?: any;
  posPercentageRateValue?: any;
  anticipationFee?: any;
  orderType?: any;
  situation?: any;
  searchNickname?: any;
  automaticAnticipationIndicator?: any;
  documentNumberCompany: string;
  companyType?: any;
  companyName?: any;
  fancyName?: any;
  stateRegistration?: any;
  businessActivity?: any;
  estUrl?: any;
  companyResponsibleName?: any;
  openingHours?: any;
  openingDate?: any;
  shopping?: any;
  referencePoint?: any;
  ecommerceURL?: any;
  idCompanyGroup: number;
  idDepartament?: any;
  equipmentIdentifier?: any;
  posQuantity?: any;
  gpEstablishmentNumber?: any;
  companyShortName?: any;
  idCompanyOwner?: any;
  transactionAmount?: any;
  tedBillingIdentifier?: any;
  tedAmount?: any;
  identificationWithSoftwareExpress?: any;
}

export class RootObject {
  content: Content[];
}
