export interface State {
  idState: number
	uf: string
  stateName: string
}

export interface StateResponse {
  content: [
    {
      idState: number
      uf: string
      stateName: string
    }
  ]
}