import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/Profile';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-bank-account',
  templateUrl: './edit-bank-account.component.html',
  styleUrls: ['./edit-bank-account.component.scss']
})
export class EditBankAccountComponent implements OnInit {

  profile: Content = {
    idProfile: null,
    nameProfile: '',
    description: '' 
  }

  constructor(private router: Router, public dialogRef: MatDialogRef<EditBankAccountComponent>,
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
  
  updateBankAccount(): void {
    this.dataService.update(this.profile).subscribe(() => {
      this.dataService.openSnackBar('Produto atualizado com sucesso', 'X');
      this.dialogRef.close();;
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  dataSource: any[] = [];


}

