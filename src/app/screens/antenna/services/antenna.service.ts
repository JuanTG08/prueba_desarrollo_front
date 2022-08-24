import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntennaService {

  URL_API: string = `${environment.URL_API + environment.PORT_API}/api/antenas`;

  constructor(
    private http: HttpClient,
  ) { }

  getAllListAntenna() {
    return this.http.get(`${this.URL_API}/antenaHanddlers`).toPromise();
  }

  createNewAntenna(data) {
    return this.http.post(`${this.URL_API}/antenaHanddlers`, data).toPromise();
  }
}
