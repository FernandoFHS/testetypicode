export interface PaymentMethodRequest {
  id:number,
  description: string
}

export interface PaymentMethodRoot{
  content:PaymentMethodRequest

}