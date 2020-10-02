import { ModuleWithComponentFactories, ModuleWithProviders, NgModule } from '@angular/core';
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
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    LoginComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    LoginComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,

    AngularMaterialModule
  ],
  bootstrap: [AppComponent]

})
export class CoreModule {

}