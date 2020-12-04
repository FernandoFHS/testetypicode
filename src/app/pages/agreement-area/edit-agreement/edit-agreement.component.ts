import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';

@Component({
  selector: 'app-edit-agreement',
  templateUrl: './edit-agreement.component.html',
  styleUrls: ['./edit-agreement.component.scss']
})
export class EditAgreementComponent implements OnInit {
  
  breadcrumb_model: BreadcrumbModel = {
    active: {
      title: 'Editar Contrato',
      route: 'rule'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Contratos', route: '/agreements' },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
