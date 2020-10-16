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
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { AddPartnerComponent } from './pages/add-partner/add-partner.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    CompanyComponent,
    PasswordTransactionComponent,
    AddProfileComponent,
    EditProfileComponent,
    ProfileListComponent,
    DeleteProfileComponent,
    CompanyListComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    AddPartnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    NgxMaskModule.forRoot(),    
    
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
