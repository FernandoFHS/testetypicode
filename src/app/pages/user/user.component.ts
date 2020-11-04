import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';
import { Profile } from '../../models/profile';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements AfterViewInit {
  resultsLength = 0;
  page: number;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.dataService.refreshTable().subscribe(() => {
      this.loadData();
    });

    this.loadData();
  }
  headers: HeaderModel[] = [
    { text: 'Código', value: 'idProfile' },
    { text: 'Empresa', value: 'nameProfile' },
    { text: 'Descrição', value: 'description' },
    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true,
  };

  dataSource: any[] = [];

  dinamicAddRouter = '/profile-list/add-profile';

  public loadData() {
    //this.exampleDatabase = new DataService(this.httpClient);
    
       this.dataService.getAllProfiles(10, 1).then(
         (data) => {
           this.dataSource = data;             
         },
         (error) => {
           console.log('Data not found');
         }
       )

      // merge(5, this.paginator.page).pipe(
      //   startWith({}),
      //   switchMap(() => {
      //    return this.dataService.getAllProfiles(
      //       5, this.paginator.pageIndex);
      //   }),
      //   map(data => {

      //     this.resultsLength = data['totalElements'];

      //     return data;
      //   })
      // ).subscribe(data => this.dataSource = data)
  }


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
