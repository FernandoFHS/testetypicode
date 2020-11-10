import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.scss'],
})
export class AddPhoneComponent implements OnInit {
  phoneFormGroup: FormGroup;
  phoneNumber$: Observable<any> = of([]);

  @Output() addingDataPhone = new EventEmitter<string>();

  constructor(
    public dataService: DataService,
    public dialogRef: MatDialogRef<AddPhoneComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.phoneFormGroup = this._formBuilder.group({
      contactName: ['', Validators.required],
      companyPhone: ['', Validators.required],
    });
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

  addNewPhone(value: string) {
    this.addingDataPhone.emit(value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  savePhone(form) {
    let foneAdresstArray = this.localStorageService.get('phoneNumber');
    if (!foneAdresstArray) {
      foneAdresstArray = [];
    }
    foneAdresstArray.push(form.value);

    this.localStorageService.set('phoneNumber', foneAdresstArray);
    this.dataService.openSnackBar('Telefone adicionado com sucesso', 'X');
    this.dialogRef.close(form);
  }
}
