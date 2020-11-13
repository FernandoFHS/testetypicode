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
import { RuleAreaComponent } from '../pages/rule-area/rule-area.component';
import { AddRuleComponent } from '../pages/rule-area/add-rule/add-rule.component';
import { CompanyListComponent } from '../pages/company-list/company-list.component';
import { AddCompanyComponent } from '../pages/add-company/add-company.component';
import { EditCompanyComponent } from '../pages/edit-company/edit-company.component';
import { AddPartnerComponent } from '../pages/add-partner/add-partner.component';
import { PlansComponent } from '../pages/plans/plans.component';
import { EditPartnerComponent } from '../pages/edit-partner/edit-partner.component';
import { ListRuleComponent } from '../pages/rule-area/list-rule/list-rule.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
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
        path: 'rule-area',
        component: RuleAreaComponent,
        children: [
          {
            path: '',
            redirectTo: 'list-rule',
            pathMatch: 'full'
          },
          {
            path: 'add-rule',
            component: AddRuleComponent
          },
          {
            path: 'list-rule',
            component: ListRuleComponent
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
            path: 'edit-company/:id',
            component: EditCompanyComponent,
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
        path: 'plans',
        component: PlansComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
      },
    ]
  }
];
