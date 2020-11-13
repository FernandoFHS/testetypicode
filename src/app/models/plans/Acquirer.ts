export interface AcquirerRequest {
  id: number,
  description: String,
  code: String
}
export interface AcquirerResponse {
content: [
  {
    id: number,
    description: String,
    code: String
  }
]
}