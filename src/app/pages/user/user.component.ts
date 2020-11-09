import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { Profile } from 'src/app/models/Profile';
import { DataService } from 'src/app/services/data.service';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-user',
  styleUrls: ['user.component.scss'],
  templateUrl: 'user.component.html',
})
export class UserComponent implements AfterViewInit {
  dataSource: Profile[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  ) {}

  ngAfterViewInit() {}

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
  };

  onDelete(row: any) {
    const { idProfile } = row;
    const dialogRef = this.dialog.open(DeleteProfileComponent, {
      data: { id: idProfile },
    });
  }

  onEdit(row: any) {
    const { idProfile } = row;
    this.router.navigate([`/profile-list/edit-profile/${idProfile}`]);
  }

  onAdd(index: number) {
    this.router.navigate(['/profile-list/add-profile']);
  }
}
