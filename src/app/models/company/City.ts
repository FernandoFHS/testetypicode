export interface City {
  idCity: number
  cityName: string
}


export interface CityResponse {
  content: [
    {
      idCity: number,
      cityName: string,
    }
  ]
}