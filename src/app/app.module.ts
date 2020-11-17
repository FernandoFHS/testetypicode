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
import { UserComponent } from './pages/user/user.component';
import { CompanyComponent } from './pages/company/company.component';
import { PasswordTransactionComponent } from './pages/password-transaction/password-transaction.component';
import { AddProfileComponent } from './pages/add-profile/add-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { FormsModule } from '@angular/forms';
import { DeleteProfileComponent } from './pages/delete-profile/delete-profile.component';
import { AddRuleComponent } from './pages/rule-area/add-rule/add-rule.component';
import { RuleAreaComponent } from './pages/rule-area/rule-area.component';
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
import {MatSelectModule} from '@angular/material/select';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListRuleComponent } from './pages/rule-area/list-rule/list-rule.component';
import { EditRuleComponent } from './pages/rule-area/edit-rule/edit-rule.component';
import { SimpleDataTableComponent } from './@core/components/simple-data-table/simple-data-table.component';

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
    RuleAreaComponent,
    AddRuleComponent,
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
    SimpleDataTableComponent,
    AgreementListComponent,
    EditAgreementComponent,
    AddAgreementComponent,
    PlansComponent,
    DeleteTaxComponent,
    ListRuleComponent,
    EditRuleComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    CoreModule,
    NgxSpinnerModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
