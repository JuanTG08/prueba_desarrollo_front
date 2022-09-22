import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material/material.module';

// Components
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SnakBarComponent } from './components/snak-bar/snak-bar.component';
import { MapsModule } from './components/maps/maps.module';
/* MAPS */


@NgModule({
  declarations: [ToolbarComponent, SnakBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    ToolbarComponent,
    MapsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class SharedModule { }
