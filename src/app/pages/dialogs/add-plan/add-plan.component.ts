import { RemunerationService } from './../../../services/remuneration.service';
import { PlanResponse } from './../../../models/Plan';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
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
  isPageEdit: boolean = false;
  isPageAdd: boolean = false;
  isPageView: boolean = false;

  idCompanyGroup: string;
  
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
    
    if (this.localStorageService.get('idCompanyGroup') == null) {
      this.idCompanyGroup = this.route.snapshot.queryParamMap.get('idCompanyGroup');
      this.localStorageService.set('idCompanyGroup', this.idCompanyGroup);
    } else {
      this.idCompanyGroup = this.localStorageService.get('idCompanyGroup');
    }
        
    if(this.isPageAdd){
      this.planFormGroup = this._formBuilder.group({
        id: [0],
        saleType: [0],
        acquirer: ['', Validators.required],
        creditCardFlag: ['', Validators.required],
        // remuneration: [''],
        numberOfInstallments: ['']
      })
    }else{
      this.planFormGroup = this._formBuilder.group({
        id: [this.data.id],
        saleType: [0],
        acquirer: [{value: this.data.acquirer, disabled: this.isPageView}, Validators.required],
        creditCardFlag: [{value: this.data.creditCardFlag, disabled: this.isPageView}, Validators.required],
        // remuneration:  [this.data.remuneration],
        numberOfInstallments: [this.data.numberOfInstallments]
      })
    
    }

    // this.getAllServices();
    // this.getAllRemunetarion();
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
    
    this.formTax.removeControl('isEditable');

    if(!form.value.remuneration){
      form.removeControl('remuneration');
    }
    form.controls['numberOfInstallments'].setValue(this.formTax.controls.tax.length);

    let planAndTax = {
      ...form.value,
      ...this.formTax.value
    };
    let planValidator = form.value;
    if (typeof planValidator === 'object') {
      if(this.isPageEdit){
        this.planArray.removeAt(this.planArray.value.findIndex(item => item === this.data))
      }
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
        if(data.content.length>0){
          this.planFormGroup.patchValue({
            remuneration: ({
              serviceEntity: data.content
            })
          })
        }
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