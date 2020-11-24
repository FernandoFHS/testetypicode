import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { Profile } from 'src/app/models/Profile';
import { DataService } from 'src/app/services/data.service';
import { DeleteProfileComponent } from '../../delete-profile/delete-profile.component';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-user',
  styleUrls: ['list-profiles.component.scss'],
  templateUrl: 'list-profiles.component.html',
})
export class ListProfilesComponent implements AfterViewInit {
  dataSource: Profile[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Lista de Usuários',
      route: ''
    },
    items: [
      { title: 'Home', route: '' }
    ]
  };

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router,

  ) { }

  ngAfterViewInit() { }

  loadData = (sort: string, order: string, page: number, size: number) => {
    return this.dataService.getAllProfiles(sort, order, page, size);
  };

  headers: HeaderModel[] = [
    { text: 'Código', value: 'idProfile' },
    { text: 'Empresa', value: 'nameProfile' },
    { text: 'Descrição', value: 'description' },
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true,
    view: false
  };

  onDelete(row: any) {
    const { idProfile } = row;
    const dialogRef = this.dialog.open(DeleteProfileComponent, {
      data: { id: idProfile },
    });
  }

  onEdit(row: any) {
    const { idProfile } = row;
    this.router.navigate([`/profiles/edit/${idProfile}`]);
  }

  onAdd(index: number) {
    this.router.navigate(['/profiles/add']);
  }
}
