import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    const [lat, lng] = this.placesService.userLocation;
    const myPostition = { lat, lng };

    // Establecemos el mapa
    this.map = new google.maps.Map(
      document.getElementById('map-google') as HTMLElement,
      {
        center: myPostition,
        zoom: 12,
        mapTypeId: 'terrain',
      }
    );

    // Evento para añardir marcadores
    this.map.addListener('click', (event: google.maps.MapMouseEvent) =>
      this.addMarkers(event.latLng!, 'Posición añadida')
    );

    // Adds a marker at the center of the map.
    this.addMarkers(myPostition, 'Mi posición');

    const popup = new google.maps.InfoWindow()
      .setContent(`
        <h6>Aquí estoy</h6>
        <span>Estoy aquí</span>
      `);
  }

  // Añadimos los marcadores
  addMarkers(position: google.maps.LatLng | google.maps.LatLngLiteral, title: string) {
    const marker = new google.maps.Marker({
      position,
      map: this.map,
    });
    const popup = new google.maps.InfoWindow();
    // Evento al hacerse click a un marker
    marker.addListener("click", () => {
      popup.close();
      popup.setContent(title),
      popup.open(marker.getMap(), marker);
    })
    popup.close();
    popup.setContent(title),
    popup.open(marker.getMap(), marker);
    this.markers.push(marker);
  }

  // Establecemos todos los marcadores en el mapa
  setMapOnAll(map: google.maps.Map) {
    this.markers.map((mark) => {
      mark.setMap(map);
    });
  }

  // Ocultamos todos los marcadores
  hideMarkers() {
    this.setMapOnAll(null);
  }

  // Mostramos los marcadores
  showMarkers() {
    this.setMapOnAll(this.map);
  }

  // Eliminamos todos los marcadores
  deleteMarkers() {
    this.hideMarkers();
    this.markers = [];
  }
}
