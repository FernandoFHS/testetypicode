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
        component: HomeComponent
      },
      {
        path: 'rule-area',
        component: RuleAreaComponent,
        children: [
          {
            path: '',
            redirectTo: 'add-rule',
            pathMatch: 'full'
          },
          {
            path: 'add-rule',
            component: AddRuleComponent
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
            pathMatch: 'full'
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
        path: 'company',
        component: CompanyComponent
      },
      {
        path: 'themes',
        component: ThemesComponent
      },
      {
        path: 'password-transaction',
        component: PasswordTransactionComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];