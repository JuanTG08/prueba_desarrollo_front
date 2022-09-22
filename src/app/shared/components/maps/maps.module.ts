import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { GoogleMapsModule } from '@angular/google-maps'



@NgModule({
  declarations: [MapScreenComponent, MapViewComponent, LoadingComponent],
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  exports: [
    MapScreenComponent
  ]
})
export class MapsModule { }
