import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ContainerComponent } from '../@core/components/container/container.component';
import { CompanyComponent } from '../pages/company/company.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { UserComponent } from '../pages/user/user.component';
import { PasswordTransactionComponent } from '../pages/password-transaction/password-transaction.component';

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
        path: 'user',
        component: UserComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      }, 
      {
        path: 'passwordtransaction',
        component: PasswordTransactionComponent
      },

    ]
  },

  {
    path: 'login',
    component: LoginComponent
  }
];