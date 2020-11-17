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
import { DataTableComponent } from './components/data-table/data-table.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { InputHelperComponent } from './components/input-helper/input-helper.component';
import { InputHelperDirective } from './directives/input-helper.directive';
// import { SimpleDataTableComponent } from './components/simple-data-table/simple-data-table.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { BackButtonComponent } from './components/back-button/back-button.component';


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
    // SimpleDataTableComponent,
    SaveButtonComponent,
    BackButtonComponent,
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

    DataTableComponent,
    BreadcrumbComponent,
    InputHelperComponent,
    // SimpleDataTableComponent,
    SaveButtonComponent,
    BackButtonComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,
    InputHelperDirective,

    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InputHelperComponent
  ]

})
export class CoreModule {

}