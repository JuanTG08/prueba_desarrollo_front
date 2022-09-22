import { NgModule } from '@angular/core';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DialogVehicleComponent } from './dialog-vehicle/dialog-vehicle.component';


@NgModule({
  declarations: [DialogVehicleComponent],
  imports: [
    SharedModule,
    VehicleRoutingModule
  ]
})
export class VehicleModule { }
