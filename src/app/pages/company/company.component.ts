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

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements AfterViewInit {

  dataSource: Profile[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {

      // If the user changes the sort order, reset back to the first page.
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  
      // merge(this.sort.sortChange, this.paginator.page)
      //   .pipe(
      //     startWith({}),
      //     switchMap(() => {
      //       this.isLoadingResults = true;
      //       return this.dataService.getAllProfiles(
      //         'idProfile', this.sort.direction, this.paginator.pageIndex, 10);
      //     }),
      //      map(data => {
      //        // Flip flag to show that loading has finished.
      //        this.isLoadingResults = false;
      //        this.resultsLength = data['totalElements'];
  
      //        console.log(data['content']);
      //        return data['content'];
             
      //      }),
      //     catchError(() => {
      //       this.isLoadingResults = false;
      //       return observableOf([]);
      //     })
      //   ).subscribe(data => this.dataSource = data);
        console.log('Uhul' + this.dataSource)
    }

  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
    { text: 'CPF / CNPJ', value: 'title' },
    { text: 'Identificação', value: 'nameProfile' },
    { text: 'Tipo', value: 'description' },
    { text: 'Razão Social', value: 'razsoc' },
    { text: 'MCC	', value: 'mcc' },
    { text: 'Parceiro', value: 'parner' },
    { text: 'Status', value: 'status' },
    { text: 'Tab.Vendas', value: 'tabsell' },
    { text: 'Situação', value: 'situation' },


    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true
  };

  dinamicAddRouter = "/company-list/add-company";


  onDelete(row: any) {
    const {idProfile} = row;
    const dialogRef = this.dialog.open(DeleteProfileComponent, {
      data: { id: idProfile },
    });
  }


  onEdit(index: number) {
    console.log('esse é o meu index para editar ' + index);
  }

  onAdd(index: number) {
    this.router.navigate(['/company-list/add-company']);
  }
}
