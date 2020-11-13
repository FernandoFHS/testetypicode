import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SimpleDataTableService } from 'src/app/@core/components/container/simple-data-table/simple-data-table.service';
import { Content } from 'src/app/models/Profile';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss'],
})
export class DeleteProfileComponent implements OnInit {
  profile: Content;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DeleteProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    public httpClient: HttpClient,
    private refreshTableService: SimpleDataTableService
  ) {}

  ngOnInit(): void {
    const id = this.data.id;
    //const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.readById(id).subscribe((profile) => {
      this.profile = profile;
    });
  }

  confirmDelete(): void {
    this.dataService.delete(this.profile.idProfile).subscribe(() => {
      this.dataService.openSnackBar('Usuário deletado com sucesso', 'X');
      this.dialogRef.close();
      this.refreshTableService.refreshDataTable();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dataSource: any[] = [];
}
