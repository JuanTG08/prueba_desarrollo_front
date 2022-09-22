import { Component, Output, EventEmitter } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { IPositionSelectedSend } from '../../../../interfaces/IPositionSelectedSend';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.scss']
})
export class MapScreenComponent {

  @Output() selectedPoitns = new EventEmitter<google.maps.Marker[]>();

  constructor(
    private placesService: PlacesService
  ) { }

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }


  selectedPoitnsHanddler($event) {
    this.selectedPoitns.emit($event);
  }

}
