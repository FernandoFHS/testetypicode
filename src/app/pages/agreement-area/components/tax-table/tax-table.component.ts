import { PaymentMethodRequest } from './../../../../models/PaymentMethod';
import { Observable, of } from 'rxjs';
import { PaymentMethodService } from './../../../../services/payment-method.service';
import { PaymentDeadLineService } from './../../../../services/payment-dead-line.service';
import { TaxResponse } from './../../../../models/Plan';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { PaymentDeadLineRequest } from 'src/app/models/PaymentDeadLine';


@Component({
  selector: 'app-tax-table',
  templateUrl: './tax-table.component.html',
  styleUrls: ['./tax-table.component.scss']
})
export class TaxTableComponent implements OnInit {
  @Output() private onFormGroupChange = new EventEmitter<any>();
  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  @Input() data: TaxResponse; 
  paymentDeadLine$: Observable<PaymentDeadLineRequest>
  paymentMethod$: Observable<PaymentMethodRequest>
  headersTax
  constructor(private fb: FormBuilder,
    private _paymentDeadLineService: PaymentDeadLineService,
    private _paymentMethodService: PaymentMethodService) {}

  ngOnInit(): void {
    console.log(this.data);
    
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tax: this.fb.array([])
    });
    this.addRow();
    this.onFormGroupChange.emit(this.userTable);

    this._paymentDeadLineService.getAll().subscribe(resp=>{    
      console.log(resp.content);
        
      this.paymentDeadLine$ = of(resp.content)
    })
    this._paymentMethodService.getAll().subscribe(resp=>{    
      console.log(resp.content);  
      this.paymentMethod$ = of(resp.content)
    })

    this.headersTax = [
      { header: "Parcela", formControlName: "installment", select: null },
      {
        header: "Taxa de Antecipação",
        formControlName: "antecipationTax",
        select: null
      },
      
      {
        header: "Taxa de administração",
        formControlName: "percentAdmTax",
        select: null
      },
      {
        header: "Tarifa Crédito",
        formControlName: "percentCreditTariff",
        select: null
      },
      {
        header: "Taxa de Financiamento",
        formControlName: "percentFinancialTax",
        select: null
      },
      {
        header: "Custo da Transação",
        formControlName: "transactionCostAmount",
        select: null
      },
      { header: "Valor", formControlName: "value", select: null },
      // {
      //   header: "Prazo Pagamento",
      //   formControlName: "paymentDeadLine",
      //   select: this.paymentDeadLine$
      // },
      // {
      //   header: "Método Pagamento",
      //   formControlName: "paymentMethod",
      //   select: this.paymentMethod$
      // }
    ];
    
  }

  ngAfterOnInit() {
    this.control = this.userTable.get("tax") as FormArray;
  }

  initiateForm(): FormGroup {
    if(!this.data){
      return this.fb.group({
        installment: ["", Validators.required],
        antecipationTax: ["", Validators.required],
        percentAdmTax: ["", Validators.required],
        percentCreditTariff: ["", Validators.required],
        percentFinancialTax: ["", Validators.required],
        transactionCostAmount: ["", Validators.required],
        value: ["", Validators.required],
        paymentDeadLine: ["", Validators.required],
        paymentMethod: ["", Validators.required],
        // isEditable: [true]
      });
    }else {
      return this.fb.group({
        installment: [this.data.installment, Validators.required],
        antecipationTax: [this.data.antecipationTax, Validators.required],
        percentAdmTax: [this.data.percentAdmTax, Validators.required],
        percentCreditTariff: [this.data.percentCreditTariff, Validators.required],
        percentFinancialTax: [this.data.percentFinancialTax, Validators.required],
        transactionCostAmount: [this.data.transactionCostAmount, Validators.required],
        value: [this.data.value, Validators.required],
        paymentDeadLine: [this.data.paymentDeadLine, Validators.required],
        paymentMethod: [this.data.paymentMethod, Validators.required],
        // isEditable: [true]
      });
    }
  }

  addRow() {
    const control = this.userTable.get("tax") as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.userTable.get("tax") as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get("isEditable").setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get("isEditable").setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get("tax") as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get("tax") as FormArray;
    this.touchedRows = control.controls
      .filter(row => row.touched)
      .map(row => row.value);
    // console.log(this.touchedRows);
  }
  compareFn(c1:any, c2:any): boolean {  
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }
}
