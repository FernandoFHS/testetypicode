import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionModel } from 'src/app/@core/models/action.model';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { MonitoringRuleModel } from 'src/app/models/monitoring-rule.model';
import { MonitoringRuleResponseModel } from 'src/app/models/response/monitoring-rule.response.model';
import { MonitoringRuleService } from 'src/app/services/monitoring-rule.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list-rules',
  templateUrl: './list-rules.component.html',
  styleUrls: ['./list-rules.component.scss']
})
export class ListRulesComponent implements OnInit {

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
    edit: true,
    delete: false,
    view: true
  };

  data: MonitoringRuleResponseModel;

  isLoading: boolean;

  constructor(
    private _monitoringRuleService: MonitoringRuleService,
    private _router: Router,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this._monitoringRuleService.getRules(0, 99999).then((data) => {
      this._loadData(data);
    }, (error) => {
      this._router.navigate(['/home']);
      this._notificationService.error('Erro ao carregar a lista de Regras, tente novamente.');
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

    this.data = data;

    this.isLoading = false;
  }

  onDelete(item): void { }

  onAdd(item): void {
    this._router.navigate(['rules/add']);
  }

  onEdit(item: MonitoringRuleModel): void {
    this._monitoringRuleService.setRuleToEdit(item);
    this._router.navigate([`rules/edit/${item.id}`]);
  }

  onView(item: MonitoringRuleModel): void {
    this._router.navigate([`rules/view/${item.id}`]);
  }

}
