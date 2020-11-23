import { Router } from '@angular/router';
import { PlanService } from './../../../../services/plan.service';
import { Component, OnInit } from '@angular/core';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { ActionModel } from 'src/app/@core/models/action.model';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  constructor(private planService: PlanService, private router: Router) { }

  loadData = (sort?: string, order?: string, page?: number, size?: number) => {
    return this.planService.getAll().subscribe(data => {
      console.log('Plans => ',data);
      
    });
  };

  

  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: false,
    view: false
  };

  onDelete(row: any) {
    
  }

  onEdit(index: number) {
    console.log('esse é o meu index para editar ' + index);
  }

  onAdd(index: number) {
    this.router.navigate(['/company-list/add-company']);
  }

  ngOnInit(): void {
    this.loadData();
  }

}
