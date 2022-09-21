import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAuthDataLogin } from '../interfaces/IAuth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenName: string = 'Lansanet-Auth-Token';
  keyUsername: string = 'Lansanet-Key-User';
  URL_API: string = `${environment.URL_API + environment.PORT_API}`;
  URL_API_AUTH: string = `${environment.URL_API + environment.PORT_API}/api/auth`;

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  // Establecemos el Token
  setTokenAuth(tokenAuth: string): boolean {
    localStorage.setItem(this.tokenName, tokenAuth);
    return true;
  }
  // Establecemos la variable local del usuario
  setLocalUser(value: string): boolean {
    localStorage.setItem(this.keyUsername, value);
    return true;
  }

  // Obtenemos el token
  getTokenAuth() {
    const token = localStorage.getItem(this.tokenName);
    if (token) return token;
    return false;
  }
  // Obtenemos la variable local del usuario
  getLocalUser(): string {
    const user = JSON.parse(localStorage.getItem(this.keyUsername));
    if (user) return user.name;
    return '--/--';
  }

  decodeToken(token: string) {
    if (!token) return false;
    return JSON.parse(atob(token));
  }

  clearTokenAuth() {
    localStorage.clear();
  }

  loginAuthHandler(dataLogin: IAuthDataLogin) {
    return this.http.post(`${this.URL_API}/auth/login`, dataLogin).toPromise();
  }

  isTokenActive(iat: number): boolean {
    return new Date().getTime() < iat;
  }

  isLoggedIn(): Promise<Response> {
    return this.http.get<Response>(`${this.URL_API_AUTH}/verify`).toPromise();
  }

  async logOut() {
    await this.clearTokenAuth();
    this.route.navigate(['/login']);
  }
}
