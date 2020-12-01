import { PlansComponent } from './pages/plans/plans.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CoreModule } from './@core/core.module';
import { UserComponent } from './pages/user/user.component';
import { CompanyComponent } from './pages/company/company.component';
import { PasswordTransactionComponent } from './pages/password-transaction/password-transaction.component';
import { AddProfileComponent } from './pages/add-profile/add-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { FormsModule } from '@angular/forms';
import { DeleteProfileComponent } from './pages/delete-profile/delete-profile.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { AddPartnerComponent } from './pages/add-partner/add-partner.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AddBankAccountComponent } from './pages/dialogs/add-bank-account/add-bank-account.component';
import { EditBankAccountComponent } from './pages/dialogs/edit-bank-account/edit-bank-account.component';
import { DeleteBankAccountComponent } from './pages/dialogs/delete-bank-account/delete-bank-account.component';
import { DeletePhoneComponent } from './pages/dialogs/delete-phone/delete-phone.component';
import { DeletePartnerComponent } from './pages/dialogs/delete-partner/delete-partner.component';
import { EditPhoneComponent } from './pages/dialogs/edit-phone/edit-phone.component';
import { AddPhoneComponent } from './pages/dialogs/add-phone/add-phone.component';
import { EditPartnerComponent } from './pages/edit-partner/edit-partner.component';
import { DeleteTaxComponent } from './pages/agreement-area/delete-tax/delete-tax.component';
import { AgreementAreaComponent } from './pages/agreement-area/agreement-area.component';
import { AgreementListComponent } from './pages/agreement-area/agreement-list/agreement-list.component';
import { EditAgreementComponent } from './pages/agreement-area/edit-agreement/edit-agreement.component';
import { AddAgreementComponent } from './pages/agreement-area/add-agreement/add-agreement.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RulesComponent } from './pages/rules/rules.component';
import { RuleComponent } from './pages/rules/rule/rule.component';
import { ListRulesComponent } from './pages/rules/list-rules/list-rules.component';
import { Error404Module } from './pages/errors/404/error-404.module';
import { CurrentAccountComponent } from './pages/current-account/current-account.component';
import { ExtractComponent } from './pages/current-account/extract/extract.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MglTimelineModule } from 'angular-mgl-timeline';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    CompanyComponent,
    PasswordTransactionComponent,
    RulesComponent,
    RuleComponent,
    AddProfileComponent,
    EditProfileComponent,
    ProfileListComponent,
    DeleteProfileComponent,
    CompanyListComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    AddPartnerComponent,
    AddBankAccountComponent,
    EditBankAccountComponent,
    DeleteBankAccountComponent,
    DeletePhoneComponent,
    DeletePartnerComponent,
    EditPhoneComponent,
    AddPhoneComponent,
    AgreementAreaComponent,
    DeleteTaxComponent,
    EditPartnerComponent,
    ListRulesComponent,
    AgreementListComponent,
    EditAgreementComponent,
    AddAgreementComponent,
    PlansComponent,
    DeleteTaxComponent,
    CurrentAccountComponent,
    ExtractComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    CoreModule,
    NgxSpinnerModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    Error404Module,
    MglTimelineModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
