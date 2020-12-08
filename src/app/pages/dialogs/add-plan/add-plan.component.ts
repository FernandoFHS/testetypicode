import { RemunerationService } from './../../../services/remuneration.service';
import { PlanResponse } from './../../../models/Plan';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CreditCardFlagRequest } from 'src/app/models/CreditCardFlag';
import { AcquirerRequest } from 'src/app/models/plans/Acquirer';
import { RemunerationTypeRequest } from 'src/app/models/RemunerationType';
import { ServiceEntityRequest } from 'src/app/models/ServiceEntity';
import { AcquirerService } from 'src/app/services/acquirer.service';
import { CreditCardFlagService } from 'src/app/services/credit-card-flag.service';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RemunerationTypeService } from 'src/app/services/remuneration-type.service';
import { ServiceEntityService } from 'src/app/services/service-entity.service';

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

  plan: PlanResponse;

  serviceEntity$: Observable<Array<ServiceEntityRequest>>;
  creditCardFlag$: Observable<Array<CreditCardFlagRequest>>;
  remunerationType$: Observable<Array<RemunerationTypeRequest>>;
  remuneration$: Observable<Array<any>>;
  acquirer$: Observable<Array<AcquirerRequest>>;

  formTax: any = ''
  isEdit: boolean = false;
  isAdd: boolean = false;
  isView: boolean = false;
  

  agreementForm: FormGroup

  constructor(public dialogRef: MatDialogRef<AddPlanComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dataService: DataService,
    private _formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private creditCardFlagService: CreditCardFlagService,
    private remunerationTypeService: RemunerationTypeService,
    private serviceEntityService: ServiceEntityService,
    private acquirerService: AcquirerService,
    private remunerationService: RemunerationService,
    private router: Router
  ) { }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
    
    
    if(this.data.id){
      this.isEdit = true;            
      this.planFormGroup = this._formBuilder.group({
        id: [this.data.id],
        saleType: [0],
        acquirer: [this.data.acquirer, Validators.required],
        creditCardFlag: [this.data.creditCardFlag, Validators.required],
        remuneration:  [this.data.remuneration, Validators.required],
        numberOfInstallments: [this.data.numberOfInstallments]
      })

    }else{

    this.planFormGroup = this._formBuilder.group({
      id: [0],
      saleType: [0],
      acquirer: ['', Validators.required],
      creditCardFlag: ['', Validators.required],
      remuneration: ['', Validators.required],
      numberOfInstallments: ['']
    })
    }

    this.getAllServices();
    this.getAllRemunetarion();
    this.getAllCreditCardFlag();
    this.getAllAcquirer();
  }

  public onFormGroupChangeEvent(_event) {
    this.formTax = _event;
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

  saveAccount(form) {
    // let planArray: PlanResponse[] = this.localStorageService.get('plan');
    // if(!planArray){
    //   planArray = [];
    // }
    //console.log('formTax.length - ', this.formTax.value.tax.length);
    form.controls['numberOfInstallments'].setValue(12);
    // form.controls['idServiceEntity'].setValue(form.value.serviceEntity.id); 
    // form.controls['idCreditCardFlag'].setValue(form.value.creditCardFlag.id); 
    // form.controls['idRemunerationType'].setValue(form.value.remunerationType.id);
    let planAndTax = {
      ...form.value,
      ...this.formTax.value
    };
    let planValidator = form.value;
    if (typeof planValidator === 'object') {
      this.planArray.push(this._formBuilder.control(planAndTax))
      this.dataService.openSnackBar('Plano adicionado com sucesso', 'X');
      this.dialogRef.close(form);
    } else {
      this.planValidatorError = true;
    }
  }

  get planArray() {    
    return this.agreementForm.get('plans') as FormArray;
  }
  get taxArray() {    
    return this.formTax.get('tax') as FormArray;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getAllServices() {
    this.serviceEntityService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.serviceEntity$ = of(data.content);
        // console.log(this.planFormGroup.controls.remuneration.controls.serviceEntity);
        // this.planFormGroup.controls.get('remuneration.serviceEntity').setValue('1300');
        this.planFormGroup.patchValue({
          remuneration: ({
            serviceEntity: data.content
          })
        })

        // this.planFormGroup.controls['remuneration'].controls['serviceEntity'].setValue(data.content); 

      });
  }
  getAllCreditCardFlag() {
    this.creditCardFlagService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.creditCardFlag$ = of(data.content);
      });
  }
  getAllAcquirer() {
    this.acquirerService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.acquirer$ = of(data.content);
      });
  }
  getAllRemunetarionType() {
    this.remunerationTypeService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.remunerationType$ = of(data.content);
      });
  }

  getAllRemunetarion() {
    this.remunerationService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.remuneration$ = of(data.content);
      });
  }
  compareFn(c1:any, c2:any): boolean {  
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }

}