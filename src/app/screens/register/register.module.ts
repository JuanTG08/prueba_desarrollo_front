import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
