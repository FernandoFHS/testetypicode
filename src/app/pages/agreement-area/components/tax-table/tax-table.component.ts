import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";


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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tax: this.fb.array([])
    });
    this.addRow();
    this.onFormGroupChange.emit(this.userTable);
  }


  ngAfterOnInit() {
    this.control = this.userTable.get("tax") as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      installment: ["1", Validators.required],
      antecipationTax: ["1", Validators.required],
      percentAdmTax: ["1", Validators.required],
      percentCreditTariff: ["1", Validators.required],
      percentFinancialTax: ["1", Validators.required],
      transactionCostAmount: ["1", Validators.required],
      value: ["1", Validators.required],
      idPaymentDeadLine: [1, Validators.required],
      idPaymentMethod: [1, Validators.required],
      isEditable: [true]
    });
  }

  selectData = [
    { value: 1, text: 'Primeira opção' },
    { value: 2, text: 'Segunda opção' },
    { value: 3, text: 'Terceira opção' },
    { value: 4, text: 'Quarta opção' }
  ];

  headersTax = [
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
    {
      header: "Prazo Pagamento",
      formControlName: "idPaymentDeadLine",
      select: this.selectData
    },
    {
      header: "Método Pagamento",
      formControlName: "idPaymentMethod",
      select: this.selectData
    }
  ];

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
    console.log(this.touchedRows);
  }
}
