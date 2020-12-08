import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ContainerComponent } from './components/container/container.component';
import { ContainerFooterComponent } from './components/container/footer/footer.component';
import { ContainerHeaderComponent } from './components/container/header/header.component';
import { ContainerSidebarComponent } from './components/container/sidebar/sidebar.component';
import { AccordionAnchorDirective } from './directives/accordion-anchor.directive';
import { AccordionLinkDirective } from './directives/accordion-link.directive';
import { AccordionDirective } from './directives/accordion.directive';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ThemesComponent } from './components/themes/themes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { InputHelperDirective } from './directives/input-helper.directive';
import { DataTableComponent } from './components/data-table/data-table.component';
import { InputHelperComponent } from './components/input-helper/input-helper.component';
import { SimpleDataTableComponent } from './components/simple-data-table/simple-data-table.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { NextButtonComponent } from './components/next-button/next-button.component';
import { CancelButtonComponent } from './components/cancel-button/cancel-button.component';
import { RecoverButtonComponent } from './components/recover-button/recover-button.component';
import { RefuseButtonComponent } from './components/refuse-button/refuse-button.component';
import { AcceptButtonComponent } from './components/accept-button/accept-button.component';
import { ChangeButtonComponent } from './components/change-button/change-button.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    ThemesComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,
    InputHelperDirective,

    DataTableComponent,
    BreadcrumbComponent,
    InputHelperComponent,
    SimpleDataTableComponent,
    SaveButtonComponent,
    BackButtonComponent,
    ConfirmDialogComponent,
    DeleteButtonComponent,
    NextButtonComponent,
    CancelButtonComponent,
    RecoverButtonComponent,
    RefuseButtonComponent,
    AcceptButtonComponent,
    ChangeButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule
  ],
  exports: [
    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    ThemesComponent,

    DataTableComponent,
    BreadcrumbComponent,
    InputHelperComponent,
    SimpleDataTableComponent,
    SaveButtonComponent,
    BackButtonComponent,
    DeleteButtonComponent,
    NextButtonComponent,
    CancelButtonComponent,
    RecoverButtonComponent,
    RefuseButtonComponent,
    AcceptButtonComponent,
    ChangeButtonComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,
    InputHelperDirective,

    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InputHelperComponent,
    ConfirmDialogComponent
  ]
})
export class CoreModule {
}