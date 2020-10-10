import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ContainerComponent } from '../@core/components/container/container.component';
import { ThemesComponent } from '../@core/components/themes/themes.component';
import { CompanyComponent } from '../pages/company/company.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { UserComponent } from '../pages/user/user.component';
import { PasswordTransactionComponent } from '../pages/password-transaction/password-transaction.component';
import { ProfileListComponent } from '../pages/profile-list/profile-list.component';
import { AddProfileComponent } from '../pages/add-profile/add-profile.component';
import { EditProfileComponent } from '../pages/edit-profile/edit-profile.component';
import { CompanyListComponent } from '../pages/company-list/company-list.component';
import { AddCompanyComponent } from '../pages/add-company/add-company.component';
import { EditCompanyComponent } from '../pages/edit-company/edit-company.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [{
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }, {
      path: 'home',
      component: HomeComponent
    },{
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
      },{
      path: 'company-list',
      component: CompanyListComponent,
      children: [
        {
          path: '',
          redirectTo: 'company',
          pathMatch: 'full'
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
          path: 'edit-company',
          component: EditCompanyComponent,
        },
      ]
    }, {
      path: 'themes',
      component: ThemesComponent
    }, {
      path: 'password-transaction',
      component: PasswordTransactionComponent
    }]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];