import { Component, OnInit } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';
import { IVehicle } from '../../shared/interfaces/IVehicles';
import { IResponse } from '../../shared/interfaces/IResponse';
import { DialogVehicleComponent } from './dialog-vehicle/dialog-vehicle.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  listVehicles!: IVehicle[];
  _idPropietario!: string;
  constructor(
    private service: VehicleService,
    private service_auth: AuthService,
    private route: Router,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getListMineVehicle();
  }

  async getListMineVehicle() {
    const _id: any = await this.service_auth.getMineID();
    if (!_id) return this._snack.open('Error al procesar', 'Cerrar');
    this._idPropietario = _id;
    await this.service
      .getListVehicles(_id)
      .then((res: IResponse) => {
        if (res.error || res.statusCode != 200)
          return this._snack.open('Error de Conexión', 'Cerrar');
        this.listVehicles = res.payload;
      })
      .catch((err) => this._snack.open('Error de Conexión', 'Cerrar'));
  }

  openDialog(funcionality: string, vehicle: IVehicle = null) {
    const dialogVehicle = this.dialog.open(DialogVehicleComponent, {
      width: '700px',
      height: '600px',
      data: { funcionality, vehicle, _idPropietario: this._idPropietario },
    });
    dialogVehicle
      .afterClosed()
      .subscribe(async (result) =>
        result ? await this.getListMineVehicle() : false
      );
  }
}
