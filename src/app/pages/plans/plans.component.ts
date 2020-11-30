import { AcquirerRequest } from './../../models/plans/Acquirer';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteTaxComponent } from './delete-tax/delete-tax.component';
import { ActionModel } from 'src/app/@core/models/action.model';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ServiceEntityService } from '../../services/service-entity.service';
import { CreditCardFlagService } from '../../services/credit-card-flag.service';
import { RemunerationTypeService } from '../../services/remuneration-type.service';
import { AcquirerService } from '../../services/acquirer.service';
import { ServiceEntityRequest } from '../../models/ServiceEntity';
import { CreditCardFlagRequest } from '../../models/CreditCardFlag';
import { RemunerationTypeRequest } from '../../models/RemunerationType';
import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR',
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class PlansComponent implements OnInit {

  agreementFormGroup: FormGroup;
  serviceEntity$: Observable<Array<ServiceEntityRequest>>;
  creditCardFlag$: Observable<Array<CreditCardFlagRequest>>;
  remunerationType$: Observable<Array<RemunerationTypeRequest>>;
  acquirer$: Observable<Array<AcquirerRequest>>;


  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
    { text: 'Produto', value: 'title' },
    { text: '% Taxa Administração', value: 'nameprofile' },
    { text: '% Taxa Financeira', value: 'description' },
    { text: '% Tarifa Crédito', value: 'razsoc' },
    { text: '% Custo Transação	', value: 'mcc' },
  ];
  noFlag: Boolean;
  actions: ActionModel = {
    add: true,
    edit: true,
    delete: true,
    view: false
  };

  dataSource: any[] = [];

  constructor(private _formBuilder: FormBuilder,
    private creditCardFlagService: CreditCardFlagService,
    private remunerationTypeService: RemunerationTypeService,
    private serviceEntityService: ServiceEntityService,
    private acquirerService: AcquirerService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.agreementFormGroup = this._formBuilder.group({
      idAcquirer: ['', Validators.required],
      idPaymentDeadLine: ['', Validators.required],
      description: ['', Validators.required],
      isFastInstallments: ['', Validators.required],
      idServiceEntity: ['', Validators.required],
      idCreditCardFlag: ['', Validators.required],
      idPaymentMethod: ['', Validators.required],
      idRemunerationType: ['', Validators.required],
      value: ['', Validators.required]
    })
    this.getAllServices();
    this.getAllRemunetarionType();
    this.getAllCreditCardFlag();
    this.getAllAcquirer();
  }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getAllServices() {
    this.serviceEntityService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.serviceEntity$ = of(data.content);
        console.log(this.serviceEntity$);
      });
    }
  getAllCreditCardFlag(){
    this.creditCardFlagService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.creditCardFlag$ = of(data.content)
      });
  }
  getAllAcquirer(){
    this.acquirerService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.acquirer$ = of(data.content);
        console.log(data.content);
      });
  }
  getAllRemunetarionType(){
    this.remunerationTypeService.getAll()
      .pipe(take(1))
      .subscribe((data) => {
        this.remunerationType$ = of(data.content);
      });
  }
  onDelete(idProfile: number) {
    const dialogRef = this.dialog.open(DeleteTaxComponent, {
      data: { id: idProfile },
    });
  }


  onEdit(index: number) {
    console.log('esse é o meu index para editar ' + index);
  }

  onAdd(index: number) {
    this.router.navigate(['/company-list/add-company']);
  }
}
