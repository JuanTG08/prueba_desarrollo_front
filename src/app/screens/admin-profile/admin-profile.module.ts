import { NgModule } from '@angular/core';

import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { DialogAccessComponent } from './dialog-access/dialog-access.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [DialogAccessComponent],
  imports: [
    SharedModule,
    AdminProfileRoutingModule
  ]
})
export class AdminProfileModule { }
