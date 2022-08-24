import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AntennaService } from '../services/antenna.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IResponse } from '../../../shared/interfaces/IResponse';
import { IDataForDialog } from '../interfaces/IDataForDialog';
import { IAntenna } from '../../../shared/interfaces/IAntenna';

@Component({
  selector: 'app-dialog-antenna',
  templateUrl: './dialog-antenna.component.html',
  styleUrls: ['./dialog-antenna.component.scss'],
})
export class DialogAntennaComponent implements OnInit {
  formDialogGroup!: FormGroup;
  listSectoriales!: IAntenna[];

  stationMO: boolean = true;
  apSelected!: IAntenna | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogAntennaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDataForDialog,
    private formBuilder: FormBuilder,
    public service: AntennaService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listSectoriales = this.data.access_point;
    this.formDialogGroup = this.formBuilder.group({
      ssid_sectorial: [''], // SSID De la sectorial
      mac_sectorial: [''], // SSID De la sectorial
      mode_operation: ['Station'], // Modo Operacion
      point_to_point: ['false'],
      name_device: ['', Validators.required],
      mac_device: ['', Validators.required],
      channel: [''],
      frequency: ['', Validators.required],
      country: ['United Kingdom'],
      potency: [24, Validators.min(0)],
      wireless_security: ['', Validators.required],
      antena_type: ['LiteBeam M5'],
      device_version: [''],
      device_user: ['ubnt', Validators.required],
      device_password: ['', Validators.required],
      device_ip: ['', Validators.required],
      device_location: ['', Validators.required],
    });
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
            return 'La longitud minima es de 8';
          case 'maxlength':
            return 'La longitud maxima es de 64';
          default:
            console.log(err);
            return 'Error en la validación';
        }
      }
    }
    return;
  }

  changeModeOp() {
    const mode_operation = this.formDialogGroup.get('mode_operation').value;
    switch (mode_operation) {
      case 'AccessPoint':
        this.stationMO = false;
        this.apSelected = undefined;
        break;
      case 'Station':
        this.stationMO = true;
        break;
      default:
        this._snack.open('Error en el campo del AP', 'Ok');
        break;
    }
  }

  selectionAC(input: HTMLInputElement) {
    const { value } = input;
    if (value === undefined) return this._snack.open('Error campo indefinido', 'Ok');
    const sectorial = this.listSectoriales.filter(({ _id }) => _id === value);
    if (sectorial.length === 0) return this._snack.open('AP Invalida', 'Ok');
    this.apSelected = sectorial[0];
  }

  submitAntenna() {
    if (this.formDialogGroup.invalid) return this._snack.open('Error en los campos, por favor Verficar', 'Ok');
    /*
      Apartado de la sectorial y su logica
    */
    // Si se seleccion el modo station y no se selecciona ninguna sectorial
    if (this.stationMO && !this.apSelected)
      return this._snack.open('Error en el campo del AP', 'Ok');
    // Si se seleccion el modo AP y no escribe nada
    if (
      !this.stationMO &&
      this.formDialogGroup.get('ssid_sectorial').value.length <= 1
    )
      return this._snack.open('Campos vacios en el SSid de la Sectorial', 'Ok');
    const ssid_sectorial = this.stationMO ? this.apSelected.ssid_sectorial : this.formDialogGroup.get('ssid_sectorial').value;
    const mac_sectorial = this.stationMO ? this.apSelected.mac_sectorial : this.formDialogGroup.get('mac_device').value;
    if (!ssid_sectorial || !mac_sectorial) return this._snack.open('Error en el campo del AP ', 'Ok');

    const point_to_point = this.formDialogGroup.get('point_to_point').value === 'true';
    const channel = parseInt(this.formDialogGroup.get('channel').value);
    const frequency = parseInt(this.formDialogGroup.get('frequency').value);

    this.formDialogGroup.setValue({
      ...this.formDialogGroup.value,
      ssid_sectorial,
      mac_sectorial,
      point_to_point,
      channel,
      frequency,
    });

    this.service
      .createNewAntenna({
        ...this.formDialogGroup.value,
      })
      .then((res: IResponse) => {
        this._snack.open(res.message, 'Ok', {
          duration: 10000,
        });
        if (res.statusCode === 200) this.clearForm();
      })
      .catch((err) => this._snack.open('Error en la conexión', 'Ok'));
  }

  async clearForm() {
    console.log('first');
    await this.formDialogGroup.reset();
    this.dialogRef.close(true);
  }

  closeAlert() {
    if (confirm('¿Estas seguro de querer salir?')) this.dialogRef.close();
  }
}
