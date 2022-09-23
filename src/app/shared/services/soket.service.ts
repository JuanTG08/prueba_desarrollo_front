import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class SoketService {
  URL_API: string = `${environment.URL_API + environment.PORT_API}`;
  io = io(this.URL_API, {
    withCredentials: true,
    autoConnect: true,
  });
  constructor() {
  }
}
