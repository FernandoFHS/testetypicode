
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CompanyContact } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.scss']
})
export class EditPhoneComponent implements OnInit {

  phoneFormGroup: FormGroup;
  phoneNumber: any = this.localStorageService.get('phoneNumber');
  isLocalData: boolean;
  idCompany: number;
  idPhoneLocal: number;
  idPhoneDinamic: number;
  idCompanyGroup: any;
  model: CompanyContact;

  constructor(
    public dialogRef: MatDialogRef<EditPhoneComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private localStorageService: LocalStorageService,
    private _formBuilder: FormBuilder,
    public dataService: DataService,
    private companyService: CompanyService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.idPhoneLocal = this.data.localIndex;
    this.idPhoneDinamic = this.data.apiIndex;
    this.idCompany = this.data.idCompany;
    this.model = this.data.model;

    this.idCompanyGroup = this.localStorageService.get('idCompanyGroup');
    console.log(this.idCompanyGroup);

    if (this.idPhoneLocal || this.idPhoneLocal == 0) {
      this.isLocalData = true;
      console.log('É local')
      this.loadLocalForm();

      if (this.phoneNumber != undefined) {
        this.getLocalStorage('phoneNumber');
      }
    } else {
      this.isLocalData = false;
      console.log('É dinâmico')
      this.loadDinamicForm();
    }
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

  loadLocalForm() {
    this.phoneFormGroup = this._formBuilder.group({
      contactName: [''],
      companyPhone: [''],
    })
  }

  loadDinamicForm() {
    this.companyService.readById(this.idCompany, this.idCompanyGroup).subscribe((company) => {
      console.log('Entrou')

      this.phoneFormGroup = this._formBuilder.group({
        contactName: [this.model.contactName || ''],
        companyPhone: [this.model.companyPhone || 0],
      })
      console.log(this.phoneFormGroup.get('companyPhone'));
    })
  }

  editPhone() {
    let editableItem = {
      contactName: this.phoneFormGroup?.get('contactName').value,
      companyPhone: this.phoneFormGroup?.get('companyPhone').value,
    }

    if (this.isLocalData) {
      if (this.idPhoneLocal > -1) {
        Object.assign(this.phoneNumber[this.idPhoneLocal], editableItem);
        localStorage.setItem('phoneNumber', JSON.stringify(this.phoneNumber));
        this.dataService.openSnackBar('Telefone editado com sucesso', 'X');
        this.dialogRef.close(editableItem);
      } else {
        console.log(editableItem);
      }
    } else {
      if (this.idPhoneDinamic > -1) {

        this.dataService.openSnackBar('Telefone editado com sucesso', 'X');
        this.dialogRef.close(editableItem);
      } else {
        console.log(editableItem);
      }
    } 
    }
  getLocalStorage(item) {
    
    if (item == 'phoneNumber') {
      let localStorage = {
        contactName: this.phoneNumber[this.data.localIndex].contactName,
        companyPhone: this.phoneNumber[this.data.localIndex].companyPhone,
      }
      console.log(localStorage)
      this.phoneFormGroup.patchValue(localStorage);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
  
}
