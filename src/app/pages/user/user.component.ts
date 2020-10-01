import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionModel } from 'src/app/models/actions-model';
import { HeaderModel } from 'src/app/models/header-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
    { text: 'Empresa', value: 'title' },
    { text: 'Identificação', value: 'nameprofile' },
    { text: 'Código', value: 'description' },
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

  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);

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
