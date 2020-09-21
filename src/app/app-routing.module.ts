import { ErrorHandler } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalErrorHandler } from './utils/GlobalErrorHandler';
import { routesApplication } from './routes/routes';

@NgModule({
  imports: [RouterModule.forRoot(routesApplication)],
  exports: [RouterModule],
  providers: [{
    provide: ErrorHandler, 
    useClass: GlobalErrorHandler
  }]
})
export class AppRoutingModule { }
