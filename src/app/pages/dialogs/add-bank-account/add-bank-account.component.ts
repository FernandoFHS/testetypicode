import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/Profile';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.scss']
})
export class AddBankAccountComponent implements OnInit {

  profile: Content = {
    idProfile: null,
    nameProfile: '',
    description: '' 
  }

  constructor(public dialogRef: MatDialogRef<AddBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService, public httpClient: HttpClient,) { }


    ngOnInit(): void {
    const id = this.data.id;   
    //const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.readById(id).subscribe(profile => {
      this.profile = profile
    })
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  public loadData() {
    //this.exampleDatabase = new DataService(this.httpClient);

    this.dataService.getAllProfiles().then((data) => {

      this.dataSource = data;
      
    }, (error) => {
      // TODO
    });
  
  }

  createBankAccount(): void {
    this.dataService.create(this.profile).subscribe(() => {
      this.dataService.openSnackBar('Perfil adicionado com sucesso!', 'X')
      this.dialogRef.close();
    })
  }
  
  onNoClick(): void {
    this.dialogRef.close();
    this.loadData();
  }

  dataSource: any[] = [];


}
