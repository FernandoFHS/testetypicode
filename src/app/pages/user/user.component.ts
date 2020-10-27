import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../../models/profile';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { DeleteBankAccountComponent } from '../dialogs/delete-bank-account/delete-bank-account.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
    { text: 'Código', value: 'idProfile' },
    { text: 'Empresa', value: 'nameProfile' },
    { text: 'Descrição', value: 'description' },
    // { text: 'Ações', value: 'action' }
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true
  };

  dataSource: any[] = [];
  
  dinamicAddRouter = "/profile-list/add-profile";

  public loadData() {
    //this.exampleDatabase = new DataService(this.httpClient);

    this.dataService.getAllProfiles().then((data) => {

      this.dataSource = data;

    }, (error) => {
      // TODO
    });

  }

  onDelete(row: any) {
    const {idProfile} = row
    const dialogRef = this.dialog.open(DeleteProfileComponent, {
      data: {id: idProfile},
    });
  }


  onEdit(row: any) {
    const {idProfile} = row
    this.router.navigate([`/profile-list/edit-profile/${idProfile}`])
  }

  onAdd(index: number) {
    this.router.navigate(['/profile-list/add-profile']);
  }
}
