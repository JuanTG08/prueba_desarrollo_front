import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {
  URL_API: string = `${environment.URL_API + environment.PORT_API}/api/travel`;

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  createTravel(data: any) {
    return this.http.post(`${this.URL_API}/handdler-C-travel`, data).toPromise();
  }
}
