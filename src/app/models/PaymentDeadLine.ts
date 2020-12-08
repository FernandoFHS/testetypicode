export interface PaymentDeadLineRequest {
  id: number,
  description: string,
  deadLineType: string,
  days: number
}

export interface PaymentDeadLineRoot{
  content:PaymentDeadLineRequest

}