export class BalanceResponseModel {
  account: string;
  agency: string;
  averageTerm: number;
  balanceCompany: number;
  digit: string;
  idAccount: number;
  idCompany: number;
  reserveBalance: number;

  static mock(idCompany: number): BalanceResponseModel {
    return {
      account: '0000',
      agency: '0000',
      averageTerm: 0,
      balanceCompany: 0,
      digit: '9',
      idAccount: 0,
      idCompany: idCompany,
      reserveBalance: 13099.13
    };
  }
}