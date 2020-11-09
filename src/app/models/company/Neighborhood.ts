export interface Neighborhood {
	idNeighborhood: number
  NeighborhoodName: string
}

export interface NeighborhoodResponse {
  content: [
    {
      idNeighborhood: number
      NeighborhoodName: string
    }
  ]
}