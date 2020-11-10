// export class Mcc {
//   id: number;
//   description: string;
// }

// export class Cnae {
//   idCnae: number;
//   mcc: Mcc;
//   description: string;
//   descGroup: string;
// }

// export class CompanyContent {
//   idCompany: number;
//   companyAddress: any[];
//   companyContact: any[];
//   migration?: any;
//   cnae: Cnae;
//   email?: any;
//   registrationDate?: any;
//   gpSendDate?: any;
//   accreditationDate: string;
//   discreditationDate?: any;
//   salesTableNumber?: any;
//   companyStatus?: any;
//   userInclusionCode?: any;
//   inclusionRegistrationDateTime?: any;
//   userChangeCode?: any;
//   recordChangeDateTime?: any;
//   automaticCreditIndicator?: any;
//   seRegistrationDate?: any;
//   referentialTransactionAmount?: any;
//   posBillingTypeRental?: any;
//   posChargeAmountRental?: any;
//   tradingPartnerCode?: any;
//   idTerminal?: any;
//   logicalNumber?: any;
//   gpAffiliationDate?: any;
//   rentalExemptionDays?: any;
//   registerCode?: any;
//   posPercentageRateValue?: any;
//   anticipationFee?: any;
//   orderType?: any;
//   situation?: any;
//   searchNickname?: any;
//   automaticAnticipationIndicator?: any;
//   documentNumberCompany: string;
//   companyType?: any;
//   companyName?: any;
//   fancyName?: any;
//   stateRegistration?: any;
//   businessActivity?: any;
//   estUrl?: any;
//   companyResponsibleName?: any;
//   openingHours?: any;
//   openingDate?: any;
//   shopping?: any;
//   referencePoint?: any;
//   ecommerceURL?: any;
//   idCompanyGroup: number;
//   idDepartament?: any;
//   equipmentIdentifier?: any;
//   posQuantity?: any;
//   gpEstablishmentNumber?: any;
//   companyShortName?: any;
//   idCompanyOwner?: any;
//   transactionAmount?: any;
//   tedBillingIdentifier?: any;
//   tedAmount?: any;
//   identificationWithSoftwareExpress?: any;
// }

// export class RootObject {
//   content: CompanyContent[];
// }

export interface City {
  cityName: string;
  idCity: number;
}

export interface Neighborhood {
  idNeighborhood: number;
  neighborhoodName: string;
}

export interface State {
  idState: number;
  uf: string;
  stateName: string;
}

export interface Street {
  idStreet: number;
  zipCode: string;
  city: City;
  neighborhood: Neighborhood;
  state: State;
  streetName: string;
}

export interface CompanyAddress {
  idCompanyAddress: number;
  street: Street;
  type: string;
  number: string;
  maxDistanceDelivery: string;
  complement: string;
}

export interface CompanyContact {
  idContactCompany: number;
  contactName: string;
  companyPhone: string;
}

export interface Bank {
  idBank: number;
  code: string;
  name: string;
}

export interface ExternalBankAccount {
  idExternalBankAccount: number;
  bank: Bank;
  digit: string;
  agency: string;
  agencyDigit: string;
  account: string;
  accountDigit: string;
  accountType: string;
  masterAccount: boolean;
}

export interface PartnerAddress {
  idPartnerAddress: number;
  idStreet: number;
  idCompanyPartner?: any;
  number: string;
  complement: string;
}

export interface PartnerContact {
  idPartnerContact: number;
  idCompanyPartner?: any;
  phone: number;
}

export interface CompanyPartner {
  idCompanyPartner: number;
  idCompany: number;
  partnerAddress: PartnerAddress[];
  partnerContact: PartnerContact[];
  partnerSequentialNumber: number;
  partnerName: string;
  cpf?: any;
  dateOfBirth: Date;
}

export interface Migration {
  id: number;
  migrated: boolean;
  code: number;
  idCompany?: any;
}

export interface Mcc {
  id: number;
  code: string;
  description: string;
}

export interface Cnae {
  idCnae: number;
  mcc: Mcc;
  code: string;
  descGroup: string;
  description: string;
}

export interface Company {
  idCompany: number;
}

export interface CompanyLevelItem {
  idCompanyLevel: number;
  company: Company;
  level: number;
  description: string;
}

export interface ParentCompany {
  idCompany: number;
}

export interface ParentCompanyGroup {
  idCompany: number;
}

export interface CompanyContent {
  idCompany: number;
  documentNumberCompany: string;
  idPlan: number;
  ajtype?: any;
  companyAddress: CompanyAddress[];
  companyContact: CompanyContact[];
  externalBankAccount: ExternalBankAccount[];
  companyLevel: any[];
  companyPartner: CompanyPartner[];
  migration: Migration;
  cnae: Cnae;
  companyLevelItem: CompanyLevelItem;
  parentCompany: ParentCompany;
  parentCompanyGroup: ParentCompanyGroup;
  email: string;
  beneficiaryType: string;
  beneficiaryDocumentNumber: string;
  beneficiaryName: string;
  beneficiaryApartBankAddress: string;
  beneficiaryTypeAcount: string;
  beneficiaryOperationType: string;
  automaticAnticipationIndicator: string;
  tradingPartnerParticipationPercent: number;
  antecipationTaxPercent: number;
  anticipationByAssignmentIndicator: boolean;
  companyType: string;
  companyName: string;
  fancyName: string;
  stateRegistration: number;
  businessActivity?: any;
  estUrl: string;
  companyResponsibleName?: any;
  openingHours: number;
  openingDate: Date;
  shopping: string;
  referencePoint: string;
  ecommerceURL: string;
  idDepartament: number;
  equipmentIdentifier: number;
  posQuantity: number;
  gpEstablishmentNumber: number;
  companyShortName: string;
  transactionAmount: number;
  tedBillingIdentifier: string;
  tedAmount: number;
  registrationDate: Date;
  gpSendDate: string;
  accreditationDate: string;
  discreditationDate: string;
  companyStatus: number;
  automaticCreditIndicator: string;
  seRegistrationDate: string;
  referentialTransactionAmount: number;
  posBillingTypeRental: string;
  posChargeAmountRental: number;
  tradingPartnerCode?: any;
  idTerminal: string;
  logicalNumber: number;
  gpAffiliationDate: string;
  rentalExemptionDays: number;
  registerCode: string;
  posPercentageRateValue: number;
  anticipationFee: number;
  orderType: number;
  situation: boolean;
  searchNickname: string;
  ignoreLiberationAJManual: boolean;
  userChangeCode?: any;
  userInclusionCode?: any;
  inclusionRegistrationDateTime?: any;
  recordChangeDateTime?: any;
}
