import { PlansComponent } from './pages/plans/plans.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CoreModule } from './@core/core.module';
import { CompanyComponent } from './pages/companies/company.component';
import { PasswordTransactionComponent } from './pages/password-transaction/password-transaction.component';
import { AddProfileComponent } from './pages/profiles/profile/crud-company/add-profile.component';
import { FormsModule } from '@angular/forms';
import { DeleteProfileComponent } from './pages/delete-profile/delete-profile.component';
import { CompanyListComponent } from './pages/companies/list/list-company.component';
import { AddCompanyComponent } from './pages/companies/crud-company/add-company.component';
import { AddPartnerComponent } from './pages/companies/partners/add/add-partner.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AddBankAccountComponent } from './pages/companies/crud-company/dialogs/add-bank-account/add-bank-account.component';
import { EditBankAccountComponent } from './pages/companies/crud-company/dialogs/edit-bank-account/edit-bank-account.component';
import { DeleteBankAccountComponent } from './pages/companies/crud-company/dialogs/delete-bank-account/delete-bank-account.component';
import { DeletePhoneComponent } from './pages/companies/crud-company/dialogs/delete-phone/delete-phone.component';
import { DeletePartnerComponent } from './pages/companies/crud-company/dialogs/delete-partner/delete-partner.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RulesComponent } from './pages/rules/rules.component';
import { RuleComponent } from './pages/rules/rule/rule.component';
import { ListRulesComponent } from './pages/rules/list-rules/list-rules.component';
import { Error404Module } from './pages/errors/404/error-404.module';
import { EditPhoneComponent } from './pages/companies/crud-company/dialogs/edit-phone/edit-phone.component';
import { AddPhoneComponent } from './pages/companies/crud-company/dialogs/add-phone/add-phone.component';
import { AgreementAreaComponent } from './pages/agreement-area/agreement-area.component';
import { DeleteTaxComponent } from './pages/plans/delete-tax/delete-tax.component';
import { EditPartnerComponent } from './pages/edit-partner/edit-partner.component';
import { AgreementListComponent } from './pages/agreement-area/agreement-list/agreement-list.component';
import { EditAgreementComponent } from './pages/agreement-area/edit-agreement/edit-agreement.component';
import { AddAgreementComponent } from './pages/agreement-area/add-agreement/add-agreement.component';
import { CdkStepper } from '@angular/cdk/stepper';
import { ListProfilesComponent } from './pages/profiles/list-profiles/list-profiles.component';
import { ProfileComponent } from './pages/profiles/profiles.component';
import { InitialPasswordTransactionComponent } from './pages/password-transaction/initial-password-transaction/initial-password-transaction.component';
import { RecoverPasswordTransactionComponent } from './pages/password-transaction/recover/recover-password-transaction/recover-password-transaction.component';
import { ChangePasswordTransactionComponent } from './pages/password-transaction/change-password-transaction/change-password-transaction.component';
import { RecoverPasswordAfterValidationComponent } from './pages/recover-password-after-validation/recover-password-after-validation.component';


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
    CompanyComponent,
    PasswordTransactionComponent,
    RulesComponent,
    RuleComponent,
    ProfileComponent,
    AddProfileComponent,
    ListProfilesComponent,
    DeleteProfileComponent,
    CompanyListComponent,
    AddCompanyComponent,
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
    InitialPasswordTransactionComponent,
    RecoverPasswordTransactionComponent,
    ChangePasswordTransactionComponent,
    RecoverPasswordAfterValidationComponent
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
    Error404Module
  ],
  providers: [CdkStepper],
  bootstrap: [AppComponent]
})
export class AppModule { }
