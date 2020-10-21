import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { DataService } from 'src/app/services/data.service';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.refreshTable().subscribe(() => {
      this.loadData();
    });

    this.loadData();
  }

  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
    { text: 'CPF / CNPJ', value: 'title' },
    { text: 'Identificação', value: 'nameprofile' },
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

  exampleDatabase: DataService | null;
  // dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  dataSource: any[] = [];

  dinamicAddRouter = "/company-list/add-company";

  public loadData() {
    //this.exampleDatabase = new DataService(this.httpClient);

    this.dataService.getAllProfiles().then((data) => {

      this.dataSource = data;

    }, (error) => {
      // TODO
    });

  }

  onDelete(idProfile: number) {
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
