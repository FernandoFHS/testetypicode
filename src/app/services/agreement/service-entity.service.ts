import { ServiceEntityRequest } from '../../models/ServiceEntity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServiceEntityResponse } from '../../models/responses/ServiceEntityResponse'

@Injectable({
  providedIn: 'root'
})
export class ServiceEntityService {
  private readonly url = `${environment.baseUrlPlans}service`;
  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ServiceEntityResponse>(this.url)
  }
  getById(id:number) {
    return this.http.get<ServiceEntityRequest>(`${this.url}/${id}`)
  }
  postOrPut(serviceEntity: ServiceEntityRequest) {
    return this.http.post<ServiceEntityRequest>(this.url, serviceEntity)
  }
  delete(id:number) {
    return this.http.get<boolean>(`${this.url}/${id}`)
  }
}
