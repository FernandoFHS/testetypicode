import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/Profile';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-delete-bank-account',
  templateUrl: './delete-bank-account.component.html',
  styleUrls: ['./delete-bank-account.component.scss']
})
export class DeleteBankAccountComponent implements OnInit {

  profile: Content;

  bankAccount: any = this.localStorageService.get('bankAccount');

  constructor(private router: Router, public dialogRef: MatDialogRef<DeleteBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService, public httpClient: HttpClient,
    private localStorageService: LocalStorageService) { }
  
    ngOnInit(): void {
    const id = this.data.id;   
    //const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.readById(id).subscribe(profile => {
      this.profile = profile
    })
  }

  deleteBankAccount() {
    let deleteItem = this.data;

    if (deleteItem > -1) {
      this.bankAccount.splice(deleteItem, 1);
      localStorage.setItem('bankAccount', JSON.stringify(this.bankAccount));
    } else {
      console.log(deleteItem);
    }
    this.dialogRef.close();
  }
  
  onNoClick(): void {
    this.dialogRef.close();      ;
  }

  dataSource: any[] = [];

}
