import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModelCompany } from 'src/app/@core/models/header.model';
import { CompanyContent } from 'src/app/models/Company';
import { Profile } from 'src/app/models/Profile';
import { CompanyService } from 'src/app/services/company.service';
import { DataService } from 'src/app/services/data.service';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements AfterViewInit {

  dataSource: CompanyContent[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private companyService: CompanyService,
    private router: Router) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {}

    loadData = (sort: string, order: string, page: number, size: number) => {
      return this.companyService.getAllCompanies(sort, order, page, size);
    };

  headers: HeaderModelCompany[] = [
    { text: 'Código', value: 'idCompany', subValue: null, deepValue: null },
    { text: 'CPF / CNPJ', value: 'documentNumberCompany', subValue: null, deepValue: null },
    { text: 'Tipo', value: 'companyType', subValue: null, deepValue: null },
    { text: 'Razão Social', value: 'companyName', subValue: null, deepValue: null },
    { text: 'MCC', value: 'cnae', subValue: 'mcc', deepValue: 'code' },
    { text: 'Parceiro', value: 'userChangeCode', subValue: null, deepValue: null },
    { text: 'Status', value: 'companyStatus', subValue: null, deepValue: null },
    { text: 'Tab.Vendas', value: 'salesTableNumber', subValue: null, deepValue: null },
    { text: 'Situação', value: 'situation', subValue: null, deepValue: null },


    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: false
  };

  dinamicAddRouter = "/company-list/add-company";


  onDelete(row: any) {
    const {idProfile} = row;
    const dialogRef = this.dialog.open(DeleteProfileComponent, {
      data: { id: idProfile },
    });
  }


  onEdit(row: any) {
    const { idCompany } = row;
    this.router.navigate([`/company-list/edit-company/${idCompany}`]);
  }

  onAdd(index: number) {
    this.router.navigate(['/company-list/add-company']);
  }
}
