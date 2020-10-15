import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit(): void {
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
    { text: 'Tab.Vendas', value: 'tabsell'},
    { text: 'Situação', value: 'situation'},


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
  router="/company-list/add-company";

  public loadData() {
    //this.exampleDatabase = new DataService(this.httpClient);

    this.dataService.getAllProfiles().then((data) => {

      this.dataSource = data;
      
    }, (error) => {
      // TODO
    });
  
  }
  onDelete(index: number) {
    console.log('esse é o meu index para deletar ' + index);
   }

   
  onEdit(index: number) {
    console.log('esse é o meu index para editar ' + index);
   }
}
