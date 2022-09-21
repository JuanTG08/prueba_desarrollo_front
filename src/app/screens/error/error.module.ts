import { NgModule } from '@angular/core';

import { ErrorRoutingModule } from './error-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
