import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPositionSelectedSend } from '../../shared/interfaces/IPositionSelectedSend';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';
import { TravelsService } from '../../shared/services/travels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formTravelGroup!: FormGroup;
  showFormTravel: boolean = false;

  selectedPoitns!: google.maps.Marker[];
  my_id!: string | boolean;

  isPropietario: Boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private service: TravelsService,
    private serviceAuth: AuthService,
    public travel: TravelsService,
  ) {}

  ngOnInit(): void {
    this.getId();
    this.verifyPropietario();
    this.formTravelGroup = this.formBuilder.group({
      comment: ['', Validators.minLength(4)],
    });
  }

  async getId() {
    this.my_id = await this.serviceAuth.getMineID();
  }

  async verifyPropietario() {
    const role = await this.serviceAuth.getMyRole();
    if (!role) return this._snack.open('Error en el usuario', 'Ok')
    this.isPropietario = role == 'Propietario';
  }

  // Aceptamos los viajes
  acceptCar(data: any) {
    if (confirm('Deseas aceptar este viaje')) {
      console.log(data)
    }
  }

  /* Eventos del formulario */
  showFormTravelHanddler() {
    this.showFormTravel = !this.showFormTravel;
  }

  async sendCreateTravel() {
    if (!this.selectedPoitns || this.selectedPoitns.length < 2)
      return this._snack.open(
        'Por favor selecciona dos puntos en el Mapa',
        'Ok'
      );
    if (!this.my_id)
      return this._snack.open('Error al procesar el usuario', 'Ok');
    if (this.formTravelGroup.invalid)
      return this._snack.open('Error en los campos, por favor Verficar', 'Ok');
    const dataSend = {
      ...this.formTravelGroup.value,
      client: this.my_id,
      location_init: this.selectedPoitns[0].getPosition().toJSON(),
      location_end: this.selectedPoitns[1].getPosition().toJSON(),
    };

    await this.service
      .createTravel(dataSend)
      .then((res: any) => {
        this._snack.open(res.message, 'Ok', {
          duration: 10000,
        });
        if (res.statusCode == 200) this.cleanFormCreateTravel();
      })
      .catch((err) => this._snack.open('Error en la conexión', 'Ok'));
  }

  cleanFormCreateTravel() {
    this.formTravelGroup.get('comment').setValue('');
    this.showFormTravel = false;
  }

  selectedPoitnsHanddler($event) {
    this.selectedPoitns = $event;
  }

  // Establecemos posicion en el mapa
  setValuesForMap(locationInit: any, locationEnd: any) {
    console.log(locationInit, locationEnd)
  }

  getErrorMessage(nameInput: string) {
    const error = this.formTravelGroup.get(nameInput)?.errors;
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
