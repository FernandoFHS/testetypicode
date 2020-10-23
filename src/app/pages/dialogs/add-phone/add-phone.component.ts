import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.scss']
})
export class AddPhoneComponent implements OnInit {

  phoneFormGroup: FormGroup;

  constructor(public dataService: DataService, 
    public dialogRef: MatDialogRef<AddPhoneComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any,
    public httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.phoneFormGroup = this._formBuilder.group({    
      bank: ['', Validators.required],
      agency: ['', Validators.required],
      agencyDigit: ['', Validators.required],
      account: ['', Validators.required],
      digit: ['', Validators.required],
      accountDigit: ['', Validators.required]
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

/*  createBankAccount(): void {
this.dataService.create(this.profile).subscribe(() => {
  this.dataService.openSnackBar('Perfil adicionado com sucesso!', 'X')
  this.dialogRef.close();
})
}*/

onNoClick(): void {
this.dialogRef.close();
this.loadData();
}

dataSource: any[] = [];

}
