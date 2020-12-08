import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { CurrentAccountFilterTypeEnum } from 'src/app/enums/current-account-filter-type.enum';
import { CurrentAccountPageTypeEnum } from 'src/app/enums/current-account-page-type.enum';
import { CurrentAccountFilterDaysModel } from 'src/app/models/current-account-filter-days.model';
import { GetExtractFilterModel } from 'src/app/models/filters/get-extract.filter.model';
import { BalanceResponseModel } from 'src/app/models/responses/balance.response.model';
import { ExtractResponseModel } from 'src/app/models/responses/extract.response.model';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentAccountService } from 'src/app/services/current-account.service';
import { GeneralService } from 'src/app/services/general.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-future-postings',
  templateUrl: './future-postings.component.html',
  styleUrls: ['./future-postings.component.scss']
})
export class FuturePostingsComponent implements OnInit {

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

  idCompany: number;

  pageType: CurrentAccountPageTypeEnum | string = CurrentAccountPageTypeEnum.FUTURE_POSTINGS;
  filterType: CurrentAccountFilterTypeEnum = CurrentAccountFilterTypeEnum.TRANSACTION;

  balance: BalanceResponseModel;
  model: ExtractResponseModel;

  isLoading: boolean;
  changingPageType: boolean;

  todayDate: Date;

  @ViewChild('picker1') datePicker1: MatDatepicker<string>;
  @ViewChild('picker2') datePicker2: MatDatepicker<string>;
  @ViewChild('picker3') datePicker3: MatDatepicker<string>;
  @ViewChild('picker4') datePicker4: MatDatepicker<string>;
  @ViewChild('divTimeline') divTimeline: any;

  page: number = 0;
  itemsPerPage: number = 10;

  constructor(
    private _formBuilder: FormBuilder,
    private _generalService: GeneralService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _currentAccountService: CurrentAccountService,
    private _notificationService: NotificationService,
    private _authService: AuthService,
    private _spinnerService: NgxSpinnerService
  ) { }

  async ngOnInit(): Promise<void> {
    this.todayDate = new Date();

    await this._loadParams();

    await this._loadModel();
  }

  // TODO
  private _loadModel(loadBalance: boolean = true): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.isLoading = true;

        if (loadBalance) {
          this._loadBalance();
        }

        this._currentAccountService.getFuturePostingsByIdCompany(this.idCompany, this.page, this.itemsPerPage).subscribe((data) => {
          console.log(data);
          this.model = data;
        }, (error) => {
          console.log(error);
        }, () => {
          this.isLoading = false;
          resolve();
        });
      }
      catch (error) {
        resolve();
      }
    });
  }

  private _loadBalance(): void {
    this._currentAccountService.getBalanceByIdCompany(this.idCompany).subscribe((data) => {
      this.balance = data;
      console.log(this.balance);
    }, (error) => {
      this._notificationService.error('Erro ao carregar Saldo.');
    });
  }

  private _loadParams(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._activatedRoute.params.subscribe((params) => {
        this.idCompany = params['id_company'];

        console.log(this.idCompany);

        if (!this.idCompany || this.idCompany == 0) {
          this._generalService.showCompanyNotFoundError();
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

  changePageType(pageType: CurrentAccountPageTypeEnum | string): void {
    if (this.pageType != pageType) {
      this.pageType = pageType;
      this._router.navigate([`current-account/extract/${this.idCompany}`]);
    }
  }

  onScroll(): void {
    if (!this.model.last) {
      this._spinnerService.show();

      this.page++;

      this._currentAccountService.getFuturePostingsByIdCompany(this.idCompany, this.page, this.itemsPerPage).subscribe((data) => {
        this.model.content.push(...data.content);
        this.model.last = data.last;
      }, (error) => {
        console.log(error);
      }, () => {
        this._spinnerService.hide();
      });
    }
  }

}
