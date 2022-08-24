import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private service: AuthService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const Header: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    const authToken = this.service.getTokenAuth();
    if (authToken) {
      Header['Authorization'] = `Bearer ${authToken}`;
    }

    return next.handle(request.clone({ setHeaders: Header }));
  }
}
