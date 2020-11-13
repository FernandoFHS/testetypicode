import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbModel } from '../../models/breadcrumb';

@Component({
  selector: 'core-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  model: BreadcrumbModel;

  constructor() { }

  ngOnInit(): void {
  }

}
