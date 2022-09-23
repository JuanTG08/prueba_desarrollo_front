import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { SoketService } from './soket.service';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {
  URL_API: string = `${environment.URL_API + environment.PORT_API}/api/travel`;
  public listTravelAll: any = [];

  constructor(
    private http: HttpClient,
    private route: Router,
    private socket: SoketService,
  ) {
    this.emitGetListTravel();
    this.onGetListTravel();
  }

  createTravel(data: any) {
    return this.http.post(`${this.URL_API}/handdler-C-travel`, data).toPromise();
  }

  emitGetListTravel() {
    this.socket.io.emit('client:list-travel');
  }

  onGetListTravel() {
    this.socket.io.on('server:list-travel', ({ payload }) => {
      this.listTravelAll = payload;
    })
  }
}
