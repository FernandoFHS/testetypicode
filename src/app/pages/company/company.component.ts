import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, debounceTime, filter, map, startWith, switchMap} from 'rxjs/operators';
import { DataTableService } from 'src/app/@core/components/container/data-table/data-table.service';
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
export class CompanyComponent implements OnInit {

  // dataSource = new MatTableDataSource<CompanyContent>();
  dataSource: CompanyContent[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  cardFilterOpened = false;
  companyFormGroup: FormGroup;


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private companyService: CompanyService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private dataTableService: DataTableService
    ) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
      this.loadForm();
    }

    loadForm() {
      this.companyFormGroup = this._formBuilder.group({
        id: ['', []],
        documentNumberCompany: ['', []],
        filter: ['', []]
      });

      this.companyFormGroup.get('filter').valueChanges.pipe(
        debounceTime(1500),
        // switchMap((filter) => {
          
        // })
      ).subscribe(() => {
        this.companyFormGroup.get('id').setValue('');
        this.companyFormGroup.get('documentNumberCompany').setValue('');
        this.dataTableService.refreshDataTable();
      })

    }

    loadData = (sort: string, order: string, page: number, size: number) => {
      return this.companyService.getAllCompanies(sort, order, page, size);
    };

    loadDataByFilter = (sort: string, order: string, page: number, size: number) => {
      const form = this.companyFormGroup.getRawValue();
      const filter = {
        idCompany: form.id,
        documentNumberCompany: form.documentNumberCompany,
        companyName: form.filter
      }
      return this.companyService.getAllCompaniesByFilter(filter, sort, order, page, size)
    }

  headers: HeaderModelCompany[] = [
    { text: 'Código', value: 'idCompany', subValue: null, deepValue: null },
    { text: 'CPF / CNPJ', value: 'documentNumberCompany', subValue: null, deepValue: null },
    { text: 'Tipo', value: 'companyType', subValue: null, deepValue: null },
    { text: 'Razão Social', value: 'companyName', subValue: null, deepValue: null },
    { text: 'MCC', value: 'cnae', subValue: 'code', deepValue: null },
    { text: 'Parceiro', value: 'companyPartner', subValue: 'partnerName', deepValue: null },
    { text: 'Status', value: 'companyStatus', subValue: null, deepValue: null },
    { text: 'Tab.Vendas', value: 'salesTableNumber', subValue: null, deepValue: null },
    { text: 'Situação', value: 'situation', subValue: null, deepValue: null },
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: false
  };

  dinamicAddRouter = "/company-list/add-company";

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   // this.resultsLength = 
      
  //   console.log(this.dataSource)

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  loadModel() {
    this.companyFormGroup.get('filter').setValue('', {emitEvent: false});
    this.dataTableService.refreshDataTable();
  }

  clearFilter() {
    // let allInputs = document.querySelectorAll('input');
    // console.log(allInputs)
    // allInputs.forEach((input) => input.value = '');

    this.companyFormGroup.get('id').setValue('');
    this.companyFormGroup.get('documentNumberCompany').setValue('');

    this.dataTableService.refreshDataTable();
  }

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
