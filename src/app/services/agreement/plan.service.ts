import { PlanRequest, RootPlan } from '../../models/Plan';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  // private readonly url = `${environment.baseUrl}plan`;
  private readonly url = `${environment.baseUrlPlans}plan`;

  constructor(private http: HttpClient) { }

  // getAllPaged(sort: string, order: string, page: number, size: number): Observable<PlanRequest[]> {
  //   console.log('Realizando get no service plan');
    
  //   const requestUrl =
  //       `${this.url}?sort=${sort},${order}&page=${page}&size=${size}`;
  
  //   return this.http.get<PlanRequest[]>(requestUrl);
  // }

  getAll() {
    return this.http.get<RootPlan>(this.url)
  }
  getById(id:number) {
    return this.http.get<PlanRequest>(`${this.url}/${id}`)
  }
  postOrPut(plan: PlanRequest) {
    return this.http.post<PlanRequest>(this.url, plan)
  }
  delete(id:number) {
    return this.http.get<boolean>(`${this.url}/${id}`)
  }
}
