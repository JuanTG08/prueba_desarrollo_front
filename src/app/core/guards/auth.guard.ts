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
    const token: any = this.service.getTokenAuth();
    if (!token) this.service.logOut();
    // Obtenemos el token descodificado
    const tokenDesc: any = this.service.decodeToken(token.toString().split('.')[1]);
    if (!tokenDesc) {
      this.service.logOut();
      return false;
    }
    if (!this.service.isTokenActive(tokenDesc.iat)) this.service.logOut();
    // Comprobamos si tiene permisos de estar en esta pagina
    const { toFront } = tokenDesc.access_page;
    const path = next.url[0].path.replace('/', '').toLowerCase();
    const validRoutes = this.validateRoute(toFront, path);
    if (!validRoutes) this.route.navigate(['/not-permits']);
    return true;
  }

  validateRoute(routes: any, pathMain: string): boolean {
    return routes.filter(([{ path }]) => path.toLowerCase() === pathMain).length > 0 ? true : false;
  }
}
