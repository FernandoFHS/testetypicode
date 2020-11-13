import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionModel } from 'src/app/@core/models/action.model';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { MonitoringRuleResponseModel } from 'src/app/models/response/monitoring-rule.response.model';
import { MonitoringRuleService } from 'src/app/services/monitoring-rule.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list-rule',
  templateUrl: './list-rule.component.html',
  styleUrls: ['./list-rule.component.scss']
})
export class ListRuleComponent implements OnInit {

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Lista de Regras',
      route: 'rule'
    },
    items: [
      { title: 'Home', route: '' },
    ]
  };

  headers: HeaderModel[] = [
    { text: 'Descrição', value: 'description' },
    { text: 'Criticidade', value: 'critical_level' },
    { text: 'Status', value: 'active' },
  ];

  actions: ActionModel = {
    add: true,
    edit: false,
    delete: false
  };

  dataSource: MonitoringRuleResponseModel;

  isLoading: boolean;

  constructor(
    private _monitoringRuleService: MonitoringRuleService,
    private _router: Router,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this._monitoringRuleService.getRules(0, 999).then((data) => {
      this._loadData(data);
    }, (error) => {
      this._router.navigate(['/home']);
      this._notificationService.error('Erro ao carregar a lista de Regras, tente novamente.');
    }).finally(() => {
      this.isLoading = false;
    });
  }

  private _loadData(data: MonitoringRuleResponseModel): void {
    data.content.forEach((d) => {
      switch (d.critical_level) {
        case 'LOW':
          d.critical_level = 'Baixa';
          break;
        case 'MEDIUM':
          d.critical_level = 'Normal';
          break;
        case 'AVERAGE':
          d.critical_level = 'Alta';
          break;
      }

      switch (d.active) {
        case true:
          d.active = 'Ativa';
          break;
        case false:
          d.active = 'Inativa';
          break;
      }
    });

    this.dataSource = data;
  }

  onDelete(item: any): void { }

  onAdd(item: any): void {
    this._router.navigate(['rule-area/add-rule']);
  }

  onEdit(item: any): void { }

}
