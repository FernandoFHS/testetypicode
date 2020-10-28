import { Mcc } from 'src/app/models/Company';
export interface Cnae {
  idCnae: number,
  mcc: Mcc,
  description: String,
  code: String,
  descGroup: String
}

export interface CnaeResponse {
  content: [
    {
      idCnae: number,
      mcc: Mcc,
      description: String,
      code: String,
      descGroup: String
    }
  ]
}