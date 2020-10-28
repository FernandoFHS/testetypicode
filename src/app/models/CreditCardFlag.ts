export interface CreditCardFlagRequest{
  id: number,
  flagName: string
}
export interface CreditCardFlagResponse{
  content:[
    {
      id: number,
      flagName: string
    }
  ]
}