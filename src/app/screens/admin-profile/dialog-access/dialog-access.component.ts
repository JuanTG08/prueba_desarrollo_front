import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminProfileService } from '../admin-profile.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-access',
  templateUrl: './dialog-access.component.html',
  styleUrls: ['./dialog-access.component.scss'],
})
export class DialogAccessComponent implements OnInit {
  formDialogGroup!: FormGroup;
  accessUpdating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAccessComponent>,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private service: AdminProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.accessUpdating = this.data.funcionality === 'Actualizar';
    const { name, description, path, method, from } =
      this.data.access_page || '';
    this.formDialogGroup = this.formBuilder.group({
      name: [name, Validators.minLength(4)],
      description: [description, Validators.minLength(4)],
      path: [path, Validators.minLength(1)],
      method: [method, Validators.minLength(1)],
      from: [from, Validators.minLength(1)],
    });
  }

  async submitAccess() {
    if (this.formDialogGroup.invalid)
      return this._snack.open('Error en los campos, por favor Verficar', 'Ok');
    const dataSend = this.formDialogGroup.value;
    if (!this.accessUpdating) {
      // Creamos
      await this.service
        .createNewAccessPage(dataSend)
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
      await this.service
        .updateAccessPage(dataSend, this.data.access_page._id)
        .then((res: any) => {
          console.log(res);
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
