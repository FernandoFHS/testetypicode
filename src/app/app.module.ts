import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './@core/modules/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccordionDirective } from './@core/directives/accordion.directive';
import { AccordionLinkDirective } from './@core/directives/accordion-link.directive';
import { AccordionAnchorDirective } from './@core/directives/accordion-anchor.directive';
import { ContainerComponent } from './@core/components/container/container.component';
import { ContainerSidebarComponent } from './@core/components/container/sidebar/sidebar.component';
import { ContainerHeaderComponent } from './@core/components/container/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ContainerFooterComponent } from './@core/components/container/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,

    ContainerComponent,
    ContainerHeaderComponent,
    ContainerSidebarComponent,
    ContainerFooterComponent,

    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
