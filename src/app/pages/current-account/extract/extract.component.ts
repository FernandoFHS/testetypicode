import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { CurrentAccountFilterTypeEnum } from 'src/app/enums/current-account-filter-type.enum';
import { CurrentAccountPageTypeEnum } from 'src/app/enums/current-account-page-type.enum';
import { CurrentAccountFilterDaysModel } from 'src/app/models/current-account-filter-days.model';
import { GetExtractFilterModel } from 'src/app/models/filters/get-extract.filter.model';
import { AuthRequestModel } from 'src/app/models/requests/auth.request.model';
import { BalanceResponseModel } from 'src/app/models/responses/balance.response.model';
import { ExtractResponseModel } from 'src/app/models/responses/extract.response.model';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentAccountService } from 'src/app/services/current-account.service';
import { GeneralService } from 'src/app/services/general.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Extrato',
      route: ''
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Conta Corrente', route: '' }
    ]
  };

  filterDays: CurrentAccountFilterDaysModel[] = [
    { text: '7 dias', value: 7, active: true },
    { text: '15 dias', value: 15, active: false },
    { text: '30 dias', value: 30, active: false },
    { text: '60 dias', value: 60, active: false },
  ];

  form: FormGroup;

  idCompany: number;

  pageType: CurrentAccountPageTypeEnum | string = CurrentAccountPageTypeEnum.EXTRACT;
  filterType: CurrentAccountFilterTypeEnum = CurrentAccountFilterTypeEnum.TRANSACTION;

  balance: BalanceResponseModel;
  model: ExtractResponseModel;

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  isLoading: boolean;
  changingPageType: boolean;

  todayDate: Date;

  @ViewChild('picker1') datePicker1: MatDatepicker<string>;
  @ViewChild('picker2') datePicker2: MatDatepicker<string>;
  @ViewChild('picker3') datePicker3: MatDatepicker<string>;
  @ViewChild('picker4') datePicker4: MatDatepicker<string>;

  constructor(
    private _formBuilder: FormBuilder,
    private _generalService: GeneralService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _currentAccountService: CurrentAccountService,
    private _notificationService: NotificationService,
    private _authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.todayDate = new Date();

    await this._loadParams();

    this._loadModel();

    this._loadForm();

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  private _loadModel(): void {
    const loginRequest: AuthRequestModel = {
      email: environment.login_mobbuy.email,
      password: environment.login_mobbuy.password
    };

    this._authService.login(loginRequest).then(() => {
      const filter: GetExtractFilterModel = {
        dateTransactionFinish: '',
        dateTransactionStart: '',
        idCompany: this.idCompany.toString()
      };

      this._currentAccountService.getExtractByFilter(filter, 0, 15).subscribe((data) => {
        this.model = data;
      });

      this._currentAccountService.getBalanceByIdCompany(this.idCompany).subscribe((data) => {
        this.balance = data;
      });
    }, (error) => {
      this._notificationService.error(error);
    });
  }

  private _loadForm(): void {
    const dateNow = new Date();

    this.form = this._formBuilder.group({
      transaction_desc: [true, []],
      liquidation_desc: [{
        value: true,
        disabled: true
      }, []],

      transaction_date_start: [this._generalService.addDaysToDateNow(-7), []],
      transaction_date_end: [dateNow, []],
      liquidation_date_start: [{
        value: this._generalService.addDaysToDateNow(-7),
        disabled: true
      }, []],
      liquidation_date_end: [{
        value: dateNow,
        disabled: true
      }, []]
    });

    this.form.valueChanges.subscribe((data) => {
      this._controlButtonsFilterDayActive();
    });
  }

  private _controlButtonsFilterDayActive(): void {
    const start: Date = (this.filterType == CurrentAccountFilterTypeEnum.TRANSACTION) ?
      new Date(this.form.get('transaction_date_start').value) : new Date(this.form.get('liquidation_date_start').value);

    const end: Date = (this.filterType == CurrentAccountFilterTypeEnum.TRANSACTION) ?
      new Date(this.form.get('transaction_date_end').value) : new Date(this.form.get('liquidation_date_end').value);

    console.log(start);
    console.log(end);

    const diffInTime = end.getTime() - start.getTime();

    const diffInDays = Math.trunc(diffInTime / (1000 * 3600 * 24));

    console.log('diff in days', diffInDays);

    this.filterDays.forEach((filterDay) => {
      if (filterDay.value == diffInDays) {
        filterDay.active = true;
      }
      else {
        filterDay.active = false;
      }
    });
  }

  private _loadParams(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._activatedRoute.params.subscribe((params) => {
        this.idCompany = params['id_company'];

        if (!this.idCompany || this.idCompany == 0) {
          const message = 'Estabelecimento não encontrado, consulte o Setor Técnico.';
          const title = 'Parâmetros Inválidos';

          this._generalService.openOkDialog(message, () => {
            this._router.navigate(['/']);
          }, title)

          resolve();
        }
        else {
          resolve();
        }
      });
    });
  }

  onHeaderClick(event) {
    event.stopPropagation();
  }

  onDotClick(event) {
    event.stopPropagation();
  }

  filter(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this._notificationService.success('Filtro atualizado!');
    }, 1500);
  }

  clearFilter(): void {

  }

  changeFilterDays(filterDaySelected: CurrentAccountFilterDaysModel) {
    const dateNow = new Date();

    this.form.get('liquidation_date_start').setValue(this._generalService.addDaysToDateNow(-filterDaySelected.value));
    this.form.get('liquidation_date_end').setValue(dateNow);

    this.form.get('transaction_date_start').setValue(this._generalService.addDaysToDateNow(-filterDaySelected.value));
    this.form.get('transaction_date_end').setValue(dateNow);

    this.filterDays.forEach((filterDay) => {
      if (filterDay.value == filterDaySelected.value) {
        filterDay.active = true;
      }
      else {
        filterDay.active = false;
      }
    });

    this.filter();
  }

  changeFilterType(type: number): void {
    this.filterType = type;

    if (type == CurrentAccountFilterTypeEnum.TRANSACTION) {
      // Enable fields transaction
      this.form.get('transaction_date_start').enable();
      this.form.get('transaction_date_end').enable();
      this.form.get('transaction_desc').enable();

      // Disable fields liquidation
      this.form.get('liquidation_date_start').disable();
      this.form.get('liquidation_date_end').disable();
      this.form.get('liquidation_desc').disable();
    }
    else {
      // Enable fields liquidation
      this.form.get('liquidation_date_start').enable();
      this.form.get('liquidation_date_end').enable();
      this.form.get('liquidation_desc').enable();

      //enable fields transaction
      this.form.get('transaction_date_start').disable();
      this.form.get('transaction_date_end').disable();
      this.form.get('transaction_desc').disable();
    }
  }

  openDatePicker(type: number) {
    if (type == 1) {
      this.datePicker1.open();
    }
    else if (type == 2) {
      this.datePicker2.open();
    }
    else if (type == 3) {
      this.datePicker3.open();
    }
    else if (type == 4) {
      this.datePicker4.open();
    }
  }

  changePageType(pageType: CurrentAccountPageTypeEnum | string): void {
    if (this.pageType != pageType) {
      this.pageType = pageType;
      this._router.navigate(['current-account/future-postings/1']);
    }
  }

}
