import { State } from './State';
import { Neighborhood } from './Neighborhood';
import { City } from './City';

export interface StreetRequest {
  idStreet: number,
  zipCode: string,
  streetName: string,
  city: City,
  neighborhood: Neighborhood,
  state: State
}

export interface StreetResponse {
  content: [
    {
      idStreet: number,
      zipCode: string,
      streetName: string,
      city: City,
      neighborhood: Neighborhood,
      state: State
    }
  ]
}