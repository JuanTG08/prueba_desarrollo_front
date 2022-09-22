import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  URL_API_VEHICLE: string = `${environment.URL_API + environment.PORT_API}/api/vehicle`;

  constructor(
    private http: HttpClient,
  ) { }

  getListVehicles(_id: string) {
    return this.http.get(`${this.URL_API_VEHICLE}/handdler-R-vehicle/${_id}`).toPromise();
  }

  createNewVehicle(vehicle: any) {
    return this.http.post(`${this.URL_API_VEHICLE}/handdler-C-vehicle`, vehicle).toPromise();
  }

  updateVehicle(_idVehicle: string, _id_Propietario, vehicle: any) {
    return this.http.put(`${this.URL_API_VEHICLE}/handdler-U-vehicle/${_idVehicle}/${_id_Propietario}`, vehicle).toPromise();
  }
}
