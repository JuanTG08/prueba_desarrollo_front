import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { IPositionSelectedSend } from '../../../../interfaces/IPositionSelectedSend';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {

  @Output() selectedPoitns = new EventEmitter<google.maps.Marker[]>();
  //@Input() propietario
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];

  directionService: google.maps.DirectionsService = new google.maps.DirectionsService();;
  directionsRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    const [lat, lng] = this.placesService.userLocation;
    const myPostition = { lat, lng };

    // Establecemos el mapa
    this.map = new google.maps.Map(
      document.getElementById('map-google') as HTMLElement,
      {
        center: myPostition,
        zoom: 15,
        mapTypeId: 'terrain',
      }
    );

    // Evento para añardir marcadores
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (this.markers.length <= 1) {
        if (this.markers.length == 0) this.addMarkers(event.latLng!, { title: 'Inicial', icon: './assets/home.svg' });
        else this.addMarkers(event.latLng!, { title: 'Final', icon: './assets/current_position.svg' });
      }
      if (this.markers.length === 2) {
        this.directionsRenderer.setMap(this.map);
        this.calculateAndDisplayRoute(this.directionService, this.directionsRenderer);
      }
    });
  }

  // Añadimos los marcadores
  addMarkers(
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    { title = '', icon = null }
  ) {
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      icon,
    });
    // Evento al hacerse click a un marker
    marker.addListener('click', () => {
      this.popup(marker, title);
    });
    this.markers.push(marker);
  }

  popup(marker: google.maps.Marker, title) {
    const popup = new google.maps.InfoWindow();
    popup.close();
    popup.setContent(title);
    popup.open(marker.getMap(), marker);
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
    this.directionsRenderer.setMap(null);
    this.sendDataToFather();
  }

  // Calculamos la distancia de un punto a otro
  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
  ) {
    directionsService.route({
      origin: this.markers[0].getPosition().toJSON(),
      destination: this.markers[1].getPosition().toJSON(),
      travelMode: google.maps.TravelMode["DRIVING"],
    }, (response, status) => {
      if (status == 'OK') {
        this.sendDataToFather();
        return directionsRenderer.setDirections(response)
      };
      alert('Calculo de direcciones fallida');
    })
  }

  // Enviamos los datos al Padre
  sendDataToFather() {
    this.selectedPoitns.emit(this.markers);
  }
}
