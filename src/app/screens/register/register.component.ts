import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  hidePass: boolean = true; // Controlador de la vista del input password

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      name: ['', [Validators.required, Validators.minLength(1)]],
      last_name: ['', [Validators.required, Validators.minLength(1)]],
      role: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  registerHanddler() {
    if (this.formGroup.invalid)
      return this._snack.open('Error en los campos, por favor Verficar', 'Ok');
    const dataSend = this.formGroup.value;
    this.service
      .isRegister(dataSend)
      .then((res: any) => {
        this._snack.open(res.message, 'Ok', {
          duration: 10000,
        });
        if (res.statusCode == 200) this.goToLogin();
      })
      .catch((err) => this._snack.open('Error en la conexión', 'Ok'));
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  getErrorMessage(nameInput: string) {
    const error = this.formGroup.get(nameInput)?.errors;
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
}
