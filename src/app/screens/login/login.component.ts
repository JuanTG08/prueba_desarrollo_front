import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { IAuthDataLogin } from '../../shared/interfaces/IAuth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IResponse } from '../../shared/interfaces/IResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  hidePass: boolean = true; // Controlador de la vista del input password

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private router: Router,
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
    });
    /* Recaptcha */
  }

  ngOnInit(): void {
    this.verifyTokenAuth();
  }

  verifyTokenAuth() {
    if (this.service.getTokenAuth()) this.router.navigate(['/home']);
  }

  loginHandler() {
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;
    if (this.formGroup.invalid) return;
    const data: IAuthDataLogin = {
      email,
      password,
    };
    this.service
      .loginAuthHandler(data)
      .then((res: IResponse) => {
        if (!res.error && res.statusCode === 200 && res.payload) {
          this.service.setTokenAuth(res.payload.token);
          this.service.setLocalUser(JSON.stringify(res.payload.dataUser));
          this.router.navigate(['/home']);
        } else {
          const message =
            res.statusCode == 501 ? 'Usuario no Existente' : res.message;
          this._snack.open(message, 'Cerrar', { duration: 4000 });
        }
      })
      .catch((err) => this._snack.open('Error de Conexión', 'Cerrar'));
  }

  goToRegister() {
    this.router.navigate(['/register']);
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
