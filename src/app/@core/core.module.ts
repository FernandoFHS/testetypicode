import { ModuleWithComponentFactories, ModuleWithProviders, NgModule } from '@angular/core';
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
import { PasswordTransactionComponent } from './components/password-transaction/password-transaction.component';

@NgModule({
  declarations: [
    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,

    DataTableComponent,
    PasswordTransactionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    AppRoutingModule
  ],
  exports: [
    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,

    AngularMaterialModule,

    DataTableComponent,
    PasswordTransactionComponent
  ],
  bootstrap: [AppComponent]

})
export class CoreModule {

}