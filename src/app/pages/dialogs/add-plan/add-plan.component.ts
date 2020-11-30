import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {

  planFormGroup: FormGroup;
  bankForm = new FormControl();
  filteredBanks: Observable<any[]>;
  planValidatorError = false;

  constructor(public dialogRef: MatDialogRef<AddPlanComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    public dataService: DataService,
    private _formBuilder: FormBuilder,
    private localStorageService: LocalStorageService) { }

    formControl = new FormControl('', [
      Validators.required,
    ]);

  ngOnInit(): void {

    this.planFormGroup = this._formBuilder.group({
      numberOfInstallments: ['', Validators.required],
    })
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : '';
  }

  getAutoCompleteErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Escolha um item da lista'
      : '';
  }

  saveAccount(form){
    let planArray = this.localStorageService.get('plan');
    if(!planArray){
      planArray= [];
    }
    console.log('planArray ', planArray);
    
    planArray.push(form.value);

    let planValidator = form.value;
    console.log(planValidator);

    if (typeof planValidator === 'object') {  

      this.localStorageService.set('plan', planArray);

      this.dataService.openSnackBar('Plano adicionado com sucesso', 'X');
      this.dialogRef.close(form);
    } else {
      this.planValidatorError = true;
    }
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

}
