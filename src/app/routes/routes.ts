
import { EditAgreementComponent } from './../pages/agreement-area/edit-agreement/edit-agreement.component';

import { Routes } from '@angular/router';
import { ContainerComponent } from '../@core/components/container/container.component';
import { ThemesComponent } from '../@core/components/themes/themes.component';
import { CompanyComponent } from '../pages/company/company.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { UserComponent } from '../pages/user/user.component';
import { PasswordTransactionComponent } from '../pages/password-transaction/password-transaction.component';
import { LoginGuard } from '../pages/login/login.guard';
import { ProfileListComponent } from '../pages/profile-list/profile-list.component';
import { AddProfileComponent } from '../pages/add-profile/add-profile.component';
import { EditProfileComponent } from '../pages/edit-profile/edit-profile.component';
import { CompanyListComponent } from '../pages/company-list/company-list.component';
import { AddCompanyComponent } from '../pages/add-company/add-company.component';
import { EditCompanyComponent } from '../pages/edit-company/edit-company.component';
import { AddPartnerComponent } from '../pages/add-partner/add-partner.component';

import { RulesComponent } from '../pages/rules/rules.component';
import { ContainerGuard } from '../@core/components/container/container.guard';
import { EditPartnerComponent } from '../pages/edit-partner/edit-partner.component';
import { AgreementListComponent } from '../pages/agreement-area/agreement-list/agreement-list.component';
import { ListRulesComponent } from '../pages/rules/list-rules/list-rules.component';
import { AddRuleComponent } from '../pages/rules/add-rule/add-rule.component';
import { EditRuleComponent } from '../pages/rules/edit-rule/edit-rule.component';
import { PlansComponent } from '../pages/plans/plans.component';
import { AgreementAreaComponent } from '../pages/agreement-area/agreement-area.component';
import { AddAgreementComponent } from '../pages/agreement-area/add-agreement/add-agreement.component';

export const routes: Routes = [
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
            component: AddRuleComponent
          },
          {
            path: 'edit/:id',
            component: EditRuleComponent
          }
        ]
      },
      {
        path: 'profile-list',
        component: ProfileListComponent,
        children: [
          {
            path: '',
            redirectTo: 'user',
            pathMatch: 'full',
          },
          {
            path: 'user',
            component: UserComponent,
          },
          {
            path: 'add-profile',
            component: AddProfileComponent,
          },
          {
            path: 'edit-profile/:id',
            component: EditProfileComponent,
          },
        ],
      },
      {
        path: 'company-list',
        component: CompanyListComponent,
        children: [
          {
            path: '',
            redirectTo: 'company',
            pathMatch: 'full',
          },
          {
            path: 'company',
            component: CompanyComponent,
          },
          {
            path: 'add-company',
            component: AddCompanyComponent,
          },
          {
            path: 'edit-company/:idCompany',
            component: AddCompanyComponent,
          },
        ]
      },
      {
        path: 'themes',
        component: ThemesComponent
      },
      {
        path: 'password-transaction',
        component: PasswordTransactionComponent
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
            component: AddAgreementComponent
          },
          {
            path: 'edit/:index',
            component: EditAgreementComponent
          }
        ]
      },
      {
        path: 'plans',
        component: PlansComponent,
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];
