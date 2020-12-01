import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Error404Component } from './error-404.component';
import { CoreModule } from 'src/app/@core/core.module';
import { AngularMaterialModule } from 'src/app/@core/modules/angular-material.module';

const routes = [
    {
        path: 'errors/error-404',
        component: Error404Component
    }
];

@NgModule({
    declarations: [
        Error404Component
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        CoreModule,
        AngularMaterialModule
    ]
})
export class Error404Module {
}
