import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  hidePass: boolean = true; // Controlador de la vista del input password

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    });
  }

  ngOnInit(): void {
  }

  loginHandler() {
    const email = this.formGroup.get('email');
    const pass = this.formGroup.get('password');
    if (email.errors || pass.errors) return;

    
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
            console.log(err)
            return 'Error en la validación';
        }
      }
    }
    return ;
  }

}
