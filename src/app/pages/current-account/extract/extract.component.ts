import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Conta Corrente',
      route: ''
    },
    items: [
      { title: 'Home', route: '' },
    ]
  };

  filterDays = [
    { text: '7 dias', value: 7 },
    { text: '15 dias', value: 15 },
    { text: '30 dias', value: 30 },
    { text: '60 dias', value: 60 },
    // { text: '+ FILTROS' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onHeaderClick(event) {
    event.stopPropagation();
  }

  onDotClick(event) {
    event.stopPropagation();
  }

}
