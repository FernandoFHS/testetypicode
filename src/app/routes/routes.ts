
import { Routes } from '@angular/router';
import { ContainerComponent } from '../@core/components/container/container.component';
import { ThemesComponent } from '../@core/components/themes/themes.component';
import { CompanyComponent } from '../pages/companies/company.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { PasswordTransactionComponent } from '../pages/password-transaction/password-transaction.component';
import { LoginGuard } from '../pages/login/login.guard';
import { ListProfilesComponent } from '../pages/profiles/list-profiles/list-profiles.component';
import { AddProfileComponent } from '../pages/profiles/profile/crud-company/add-profile.component';
import { CompanyListComponent } from '../pages/companies/list/list-company.component';
import { AddCompanyComponent } from '../pages/companies/crud-company/add-company.component';
import { AddPartnerComponent } from '../pages/companies/partners/local-partner/add-partner.component';
import { RulesComponent } from '../pages/rules/rules.component';
import { EditPartnerComponent } from '../pages/edit-partner/edit-partner.component';
import { AgreementListComponent } from '../pages/agreement-area/agreement-list/agreement-list.component';
import { ListRulesComponent } from '../pages/rules/list-rules/list-rules.component';
import { AgreementAreaComponent } from '../pages/agreement-area/agreement-area.component';
import { CrudAgreementComponent } from '../pages/agreement-area/crud-agreement/crud-agreement.component';
import { RuleComponent } from '../pages/rules/rule/rule.component';
import { ContainerGuard } from '../@core/components/container/container.guard';
import { Error404Component } from '../pages/errors/404/error-404.component';
import { ProfileComponent } from '../pages/profiles/profiles.component';
import { InitialPasswordTransactionComponent } from '../pages/password-transaction/initial-password-transaction/initial-password-transaction.component';
import { ChangePasswordTransactionComponent } from '../pages/password-transaction/change-password-transaction/change-password-transaction.component';
import { RecoverPasswordTransactionComponent } from '../pages/password-transaction/recover/recover-password-transaction/recover-password-transaction.component';
import { RecoverPasswordAfterValidationComponent } from '../pages/recover-password-after-validation/recover-password-after-validation.component';
import { CurrentAccountComponent } from '../pages/current-account/current-account.component';
import { ExtractComponent } from '../pages/current-account/extract/extract.component';
import { TransactionsComponent } from '../pages/transactions/transactions.component';
import { FuturePostingsComponent } from '../pages/current-account/future-postings/future-postings.component';
import { EditApiDataComponent } from '../pages/companies/partners/dinamic-partner/dinamic-partner';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'password-recover-validation/:token',
    component: RecoverPasswordAfterValidationComponent
  },
  {
    path: '',
    component: ContainerComponent,
    // canActivateChild: [ContainerGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'rules',
        component: RulesComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ListRulesComponent,
          },
          {
            path: 'add',
            component: RuleComponent
          },
          {
            path: 'edit/:id',
            component: RuleComponent
          },
          {
            path: 'view/:id',
            component: RuleComponent
          }
        ]
      },
      {
        path: 'profiles',
        component: ProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ListProfilesComponent,
          },
          {
            path: 'add',
            component: AddProfileComponent,
          },
          {
            path: 'edit/:id',
            component: AddProfileComponent,
          },
        ],
      },
      {
        path: 'companies',
        component: CompanyComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: CompanyListComponent,
          },
          {
            path: 'add',
            component: AddCompanyComponent,
            children: [
              {
                path: 'partners/local-add',
                component: AddPartnerComponent,
              },
              {
                path: 'partners/local-edit/:index',
                component: AddPartnerComponent,
              },
            ]
          },
          {
            path: 'edit/:id',
            component: AddCompanyComponent,
            children: [
              {
                path: 'partners/api-edit/:index/:id',
                component: EditApiDataComponent,
              },
              {
                path: 'partners/api-add',
                component: EditApiDataComponent,
              },
            ]
          },
          {
            path: 'view/:id',
            component: AddCompanyComponent
          },
          // {
          //   path: 'partners/add',
          //   component: AddPartnerComponent,
          // },
          // {
          //   path: 'partners/local-edit/:index/',
          //   component: AddPartnerComponent,
          // },
        ]
      },
      {
        path: 'themes',
        component: ThemesComponent
      },
      {
        path: 'password-transaction',
        component: PasswordTransactionComponent,
        children: [
          {
            path: '',
            redirectTo: 'initial',
            pathMatch: 'full'
          },
          {
            path: 'initial',
            component: InitialPasswordTransactionComponent
          },
          {
            path: 'change',
            component: ChangePasswordTransactionComponent
          },
          {
            path: 'recover',
            component: RecoverPasswordTransactionComponent
          },
        ],
      },
      {
        path: 'add-partner',
        component: AddPartnerComponent,
      },
      {
        path: 'edit-partner/:index',
        component: EditPartnerComponent,
      },
      {
        path: 'current-account',
        component: CurrentAccountComponent,
        children: [
          {
            path: '',
            redirectTo: 'extract/:id_company',
            pathMatch: 'full'
          },
          {
            path: 'extract',
            component: ExtractComponent
          },
          {
            path: 'extract/:id_company',
            component: ExtractComponent,
          },
          {
            path: 'future-postings',
            component: FuturePostingsComponent
          },
          {
            path: 'future-postings/:id_company',
            component: FuturePostingsComponent
          }
        ]
      },
      {
        path: 'agreements',
        component: AgreementAreaComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: AgreementListComponent
          },
          {
            path: 'add',
            component: CrudAgreementComponent
          },
          {
            path: 'edit/:id',
            component: CrudAgreementComponent
          },
          {
            path: 'view/:id',
            component: CrudAgreementComponent
          }
        ]
      },
      {
        path: '**',
        component: Error404Component,
      },
    ],
  },

];
