import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntennaRoutingModule } from './antenna-routing.module';
import { DialogAntennaComponent } from './dialog-antenna/dialog-antenna.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [DialogAntennaComponent],
  imports: [
    CommonModule,
    AntennaRoutingModule,
    SharedModule
  ]
})
export class AntennaModule { }
