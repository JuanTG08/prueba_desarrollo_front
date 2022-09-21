import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {
  URL_API_ROLE: string = `${environment.URL_API + environment.PORT_API}/api/rol`;
  URL_API_ACCESS_PAGE: string = `${environment.URL_API + environment.PORT_API}/api/access-page`;

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  async getAllRoles() {
    return this.http.get(`${this.URL_API_ROLE}/handdler-CR-rol`).toPromise();
  }

  async getAllAccessPages() {
    return this.http.get(`${this.URL_API_ACCESS_PAGE}/handdler-CR-access-page`).toPromise();
  }

  async createNewAccessPage(data: any) {
    return this.http.post(`${this.URL_API_ACCESS_PAGE}/handdler-CR-access-page`, data).toPromise();
  }

  async updateAccessPage(data: any, _id: string) {
    return this.http.put(`${this.URL_API_ACCESS_PAGE}/handdler-RUDD-access-page/${_id}`, data).toPromise();
  }

  async updateRoles(data: any, _id: string) {
    return this.http.put(`${this.URL_API_ROLE}/handdler-RUDD-rol/${_id}`, data).toPromise();
  }
}
