import { PaymentMethodService } from 'src/app/services/agreement/payment-method.service';
import { PaymentMethodRequest } from 'src/app/models/PaymentMethod';
import { Observable, of } from 'rxjs';
import { PaymentDeadLineService } from 'src/app/services/agreement/payment-dead-line.service';
import { TaxResponse } from 'src/app/models/Plan';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { PaymentDeadLineRequest } from 'src/app/models/PaymentDeadLine';
import { NotificationService } from 'src/app/services/notification.service';
import {pairwise,startWith, take} from 'rxjs/operators'

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
  @Input() isPageView: boolean;
  paymentDeadLine$: Observable<PaymentDeadLineRequest>
  paymentMethod$: Observable<PaymentMethodRequest>
  headersTax
  limitCredit: number = 11
  limitInCash: number = 1
  limitDebit: number = 1
  countCredit: number
  countDebit: number
  countInCash: number
  constructor(private fb: FormBuilder,
    private _paymentDeadLineService: PaymentDeadLineService,
    private _notificationService: NotificationService,
    private _paymentMethodService: PaymentMethodService) {}

  ngOnInit(): void {    
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

    this.countTypes();
  }

  ngAfterOnInit() {
    this.control = this.userTable.get("tax") as FormArray;
  }

  editForm(index?:number): FormGroup {
    return this.fb.group({
      id: [this.data[index].id],
      installment: [this.data[index].installment, Validators.required],
      antecipationTax: [this.data[index].antecipationTax, Validators.required],
      percentAdmTax: [this.data[index].percentAdmTax, Validators.required],
      percentCreditTariff: [this.data[index].percentCreditTariff, Validators.required],
      percentFinancialTax: [this.data[index].percentFinancialTax, Validators.required],
      transactionCostAmount: [this.data[index].transactionCostAmount, Validators.required],
      value: [this.data[index].value, Validators.required],
      paymentDeadLine: [this.data[index].paymentDeadLine, Validators.required],
      paymentMethod: [this.data[index].paymentMethod, Validators.required],
      // isEditable: [!this.isPageView]
    });
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      id: [0],
      installment: ["", Validators.required],
      antecipationTax: ["", Validators.required],
      percentAdmTax: ["", Validators.required],
      percentCreditTariff: ["", Validators.required],
      percentFinancialTax: ["", Validators.required],
      transactionCostAmount: ["", Validators.required],
      value: ["", Validators.required],
      paymentDeadLine: ["", Validators.required],
      paymentMethod: ["", Validators.required],
      // isEditable: [!this.isPageView]
    });
  }

  addTax(){ 
    let control = this.userTable.get("tax") as FormArray;    
    for(let i=0; i < this.data.length; i++){
      control.push(this.editForm(i));
    }
    //let array = [] = this.userTable.get("tax").value;   
    //this.countInstallments = array.filter(item => item.paymentMethod.acronym === "C").length + 1
  }

  addRow() {
    let control = this.userTable.get("tax") as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.userTable.get("tax") as FormArray;
    if(control.controls[index].get('id').value<=0){
      control.removeAt(index);
    }else {
      this._notificationService.error('Não é possível deletar taxas já utilizadas.')
    }
  }

  editRow(group: FormGroup) {
    group.get("isEditable").setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get("isEditable").setValue(false);
  }

  selectLastGroup(index: number, property: string){
    if(index>=0){
      const control = this.userTable.get("tax") as FormArray;
      const itemTax = control.controls[index] as FormArray
      return itemTax.controls[property].value
    }
    return 0
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
  countTypes(old?,value?){
    this.getFormControls.controls.forEach(resp=>{
      this.countCredit = this.getFormControls.controls.filter(item => item.value.paymentMethod.acronym === "C").length
      this.countInCash = this.getFormControls.controls.filter(item => item.value.paymentMethod.acronym === "A").length
      this.countDebit = this.getFormControls.controls.filter(item => item.value.paymentMethod.acronym === "D").length
    })
  }
  changePaymentMethod(e,group,oldAcronym){
    group.get("installment").setValue(1);
    let value = 2
    this.getFormControls.controls.forEach(resp=>{
      if(resp.get('paymentMethod').value.acronym=="C"){
        resp.get("installment").setValue(value++);
      }
    })
    this.countTypes();
  }
}