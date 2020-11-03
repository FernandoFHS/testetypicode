export interface Bank {
  code: String,
  name: String
}

export interface BankResponse {
  content: [
    {
      code: String,
      name: String
    }
  ],
  pageable: {

  },
  totalElements:number
}