import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router) {}

    // ngOnInit() {
    //   this.dataService.refreshTable().subscribe(() => {
    //     return this.dataService.getAllProfiles(
    //       'idProfile', this.sort.direction, this.paginator.pageIndex, 10).subscribe(data => this.dataSource = data);
    //   });

    //   this.dataService.getAllProfiles(
    //     'idProfile', this.sort.direction, this.paginator.pageIndex, 10).subscribe(data => this.dataSource = data);
    // }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataService.getAllProfiles(
            'idProfile', this.sort.direction, this.paginator.pageIndex, 15);
        }),
         map(data => {
           // Flip flag to show that loading has finished.
           this.isLoadingResults = false;
           this.resultsLength = data['totalElements'];

           console.log(data['content']);
           return data['content'];
           
         }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
      console.log('Uhul' + this.dataSource)
  }

  headers: HeaderModel[] = [
    { text: 'Código', value: 'idProfile' },
    { text: 'Empresa', value: 'nameProfile' },
    { text: 'Descrição', value: 'description' },
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true
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