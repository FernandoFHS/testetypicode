import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableService } from 'src/app/@core/components/data-table/data-table.service';
import { ActionModel } from 'src/app/@core/models/action.model';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { HeaderModelCompany } from 'src/app/@core/models/header.model';
import { TransactionCsvRequestModel } from 'src/app/models/requests/transaction-csv.request.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('downloadTemplateLink') downloadTemplateLink: ElementRef;

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Transações',
      route: ''
    },
    items: [
      { title: 'Home', route: '' },
    ]
  };

  headers: HeaderModelCompany[] = [
    { text: 'Data/Hora Envio', value: 'created_at', subValue: null, deepValue: null },
    { text: 'Origem', value: 'origin', subValue: null, deepValue: null },
    { text: 'Data/Hora Início Processamento', value: 'start_date_processing', subValue: null, deepValue: null },
    { text: 'Data/Hora Fim Processamento', value: 'end_date_processing', subValue: null, deepValue: null },
    { text: 'Status Processamento', value: 'status', subValue: null, deepValue: null },
  ];

  actions: ActionModel = {
    add: false,
    edit: false,
    delete: false,
    view: false
  };

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _transactionService: TransactionService,
    private _dataTableService: DataTableService,
    private _spinnerService: NgxSpinnerService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this._loadForm();
  }

  private _loadForm(): void {
    this.form = this._formBuilder.group({
      start: ['', []],
      end: ['', []],
      origin: ['ALL', []],
      status: ['ALL', []]
    });
  }

  upload(): void {
    this.fileInput.nativeElement.click();
  }

  download(): void {
    this.downloadTemplateLink.nativeElement.click();
  }

  clearFilter(): void {
    this._loadForm();
  }

  loadDataByFilter = (sort: string, order: string, page: number, size: number) => {
    // TODO
    const form = this.form.getRawValue();

    return this._transactionService.getTransactionsBatches(page, size);
  }

  loadData = (sort: string, order: string, page: number, size: number) => {
    return this._transactionService.getTransactionsBatches(page, 10);
  };

  loadModel(): void {
    this._dataTableService.refreshDataTable();
  }

  uploadFileEvt(fileEl: { target: { files: [] } }) {

    if (fileEl.target.files && fileEl.target.files.length > 0) {

      Array.from(fileEl.target.files).forEach((file: File, index: number) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this._spinnerService.show();

          console.log(e.target.result);

          const csvSplited: string[] = e.target.result.split(',');;

          console.log(csvSplited);

          const request: TransactionCsvRequestModel = {
            id_requesting_user: 1, // TODO
            monitoring_transactions: null, // TODO
            requesting_credential: 1234, // TODO
            transactions: csvSplited[csvSplited.length - 1]
          };

          this._transactionService.postTransactionCSV(request).then(() => {
            this._notificationService.success('Transações importadas com sucesso!');
          }, (error) => {
            this._notificationService.error('Erro ao importar transações, verifique se o arquivo importado está correto.');
          }).finally(() => {
            this._spinnerService.hide();
          })
        }

        reader.readAsDataURL(file);

        if (index == fileEl.target.files.length) {
          this.fileInput.nativeElement.value = '';
        }

      });

    }

  }

}
