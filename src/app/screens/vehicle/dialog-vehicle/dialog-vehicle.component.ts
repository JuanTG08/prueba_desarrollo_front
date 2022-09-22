import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAccessComponent } from '../../admin-profile/dialog-access/dialog-access.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-dialog-vehicle',
  templateUrl: './dialog-vehicle.component.html',
  styleUrls: ['./dialog-vehicle.component.scss'],
})
export class DialogVehicleComponent implements OnInit {
  formDialogGroup!: FormGroup;
  vehicleUpdating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAccessComponent>,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private service: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.vehicleUpdating = this.data.funcionality === 'Actualizar';
    const {
      placa,
      fecha_tarjeta_op,
      fecha_soat,
      cilindraje,
      capacidad,
    } = this.data.vehicle || '';
    this.formDialogGroup = this.formBuilder.group({
      placa: [placa, Validators.minLength(3)],
      fecha_tarjeta_op: [fecha_tarjeta_op, Validators.required],
      fecha_soat: [fecha_soat, Validators.required],
      cilindraje: [cilindraje, Validators.minLength(1)],
      capacidad: [capacidad, Validators.minLength(1)],
    });
  }

  async submitAccess() {
    if (this.formDialogGroup.invalid)
      return this._snack.open('Error en los campos, por favor Verficar', 'Ok');
    let dataSend = this.formDialogGroup.value; // Establecemos los valores del formulario a esta constante
    const _idPropietario = this.data._idPropietario; // Obtenemos el id de nosotros
    if (!this.vehicleUpdating) {
      // Creamos
      // Pasamos de String a Numero
      try {
        dataSend = {
          ...dataSend,
          cilindraje: parseInt(dataSend.cilindraje),
          capacidad: parseInt(dataSend.capacidad),
          fecha_tarjeta_op: new Date(dataSend.fecha_tarjeta_op).toISOString(),
          fecha_soat: new Date(dataSend.fecha_soat).toISOString(),
        }
      } catch (error) { // Si hay letras nos dara el error
        (err) => this._snack.open('Error en los campos "Cilindraje" y/o "Capacidad', 'Ok');
      }
      dataSend = { // A su vez añadimos los valores restantes
        ...dataSend,
        propietario: _idPropietario,
        travel_status: true,
      }
      // Enviamos la peticion
      await this.service
        .createNewVehicle(dataSend)
        .then((res: any) => {
          this._snack.open(res.message, 'Ok', {
            duration: 10000,
          });
          if (!res.error && res.statusCode === 200)
            return this.dialogRef.close(true);
        })
        .catch((err) => this._snack.open('Error en la conexión', 'Ok'))
        .finally(() => this.formDialogGroup.enable());
    } else {
      // Actualizamos
      const _idVehicle = this.data.vehicle._id; // Obtenemos el ID del vehiculo
      await this.service
        .updateVehicle(_idVehicle, _idPropietario, dataSend)
        .then((res: any) => {
          this._snack.open(res.message, 'Ok', {
            duration: 10000,
          });
          if (!res.error && res.statusCode === 200)
            return this.dialogRef.close(true);
        })
        .catch((err) => this._snack.open('Error en la conexión', 'Ok'))
        .finally(() => this.formDialogGroup.enable());
    }
  }

  getErrorMessage(nameInput: string) {
    const error = this.formDialogGroup.get(nameInput)?.errors;
    if (error) {
      for (const err of Object.entries<any>(error)) {
        switch (err[0]) {
          case 'required':
            return 'Campo Requerido';
          case 'email':
            return 'Correo Electronico no valido';
          case 'minlength':
            return 'Esa no es la longitud minima';
          case 'maxlength':
            return 'Longitud maxima superada';
          default:
            return 'Error en la validación';
        }
      }
    }
    return;
  }
}
