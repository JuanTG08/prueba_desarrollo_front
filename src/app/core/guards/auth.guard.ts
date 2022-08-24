import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private route: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const token = this.service.getTokenAuth();
    if (!token) this.service.logOut();
    const tokenDesc = this.service.decodeToken(token.toString().split('.')[1]);
    if (!tokenDesc) this.service.logOut();
    if (!this.service.isTokenActive(tokenDesc.iat)) this.service.logOut();
    return true;
    /*
    this.service
      .isLoggedIn()
      .then((response: any) => {
        if (response.statusCode === 200) return true;
        this.service.clearTokenAuth();
        if (response.statusCode == 401) this.route.navigate(['/login']); // No tienes permiso
        if (response.error || response.statusCode != 200)
          this.route.navigate(['/login']);
      })
      .catch((error) => {
        this.service.clearTokenAuth();
        this.route.navigate(['/login']);
      });
    */
  }
}
