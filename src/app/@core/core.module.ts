import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ContainerComponent } from './components/container/container.component';
import { DataTableComponent } from './components/container/data-table/data-table.component';
import { ContainerFooterComponent } from './components/container/footer/footer.component';
import { ContainerHeaderComponent } from './components/container/header/header.component';
import { ContainerSidebarComponent } from './components/container/sidebar/sidebar.component';
import { AccordionAnchorDirective } from './directives/accordion-anchor.directive';
import { AccordionLinkDirective } from './directives/accordion-link.directive';
import { AccordionDirective } from './directives/accordion.directive';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ThemesComponent } from './components/themes/themes.component';
import { PasswordOfTransactionComponent } from './components/password-of-transaction/password-of-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    ThemesComponent,
    PasswordOfTransactionComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,

    DataTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    ThemesComponent,
    PasswordOfTransactionComponent,

    DataTableComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,

    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]

})
export class CoreModule {

}