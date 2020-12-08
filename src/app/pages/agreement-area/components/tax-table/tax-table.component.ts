import { PaymentMethodRequest } from './../../../../models/PaymentMethod';
import { Observable, of } from 'rxjs';
import { PaymentMethodService } from './../../../../services/payment-method.service';
import { PaymentDeadLineService } from './../../../../services/payment-dead-line.service';
import { TaxResponse } from './../../../../models/Plan';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { PaymentDeadLineRequest } from 'src/app/models/PaymentDeadLine';
import { isNull } from '@angular/compiler/src/output/output_ast';

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
  isEditable: boolean = true;
  touchedRows: any;
  @Input() data: TaxResponse[]; 
  paymentDeadLine$: Observable<PaymentDeadLineRequest>
  paymentMethod$: Observable<PaymentMethodRequest>
  headersTax
  constructor(private fb: FormBuilder,
    private _paymentDeadLineService: PaymentDeadLineService,
    private _paymentMethodService: PaymentMethodService) {}

  ngOnInit(): void {
    //console.log(this.data);
    
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tax: this.fb.array([])
    });
    if(this.data){
      this.addTax();
    }else{
      this.addRow();
    }
    
    this.onFormGroupChange.emit(this.userTable);
    this._paymentDeadLineService.getAll().subscribe(resp=>{    
      this.paymentDeadLine$ = of(resp.content)
    })
    this._paymentMethodService.getAll().subscribe(resp=>{    
      this.paymentMethod$ = of(resp.content)
    })    
  }

  ngAfterOnInit() {
    this.control = this.userTable.get("tax") as FormArray;
  }

  editForm(index?:number): FormGroup {
    return this.fb.group({
      installment: [this.data[index].installment, Validators.required],
      antecipationTax: [this.data[index].antecipationTax, Validators.required],
      percentAdmTax: [this.data[index].percentAdmTax, Validators.required],
      percentCreditTariff: [this.data[index].percentCreditTariff, Validators.required],
      percentFinancialTax: [this.data[index].percentFinancialTax, Validators.required],
      transactionCostAmount: [this.data[index].transactionCostAmount, Validators.required],
      value: [this.data[index].value, Validators.required],
      paymentDeadLine: [this.data[index].paymentDeadLine, Validators.required],
      paymentMethod: [this.data[index].paymentMethod, Validators.required],
      isEditable: [true]
    });
  }

  initiateForm(): FormGroup {
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
      isEditable: [true]
    });
  }

  addTax(){    
    let control = this.userTable.get("tax") as FormArray;    
    for(let i=0; i < this.data.length; i++){
      control.push(this.editForm(i));
    }
  }

  addRow() {
    let control = this.userTable.get("tax") as FormArray;
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
    //console.log(this.userTable.value);
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
  }
  compareFn(c1:any, c2:any): boolean {  
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }
}