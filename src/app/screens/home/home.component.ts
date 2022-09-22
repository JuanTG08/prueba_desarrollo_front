import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formTravelGroup!: FormGroup;
  showFormTravel: boolean = true;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formTravelGroup = this.formBuilder.group({
      comment: ['', Validators.minLength(4)],
      location_init: ['my_', Validators.minLength(1)],
      location_end: ['select_to_map', Validators.minLength(1)],
    });
  }

  /* Eventos del formulario */
  showFormTravelHanddler() {
    this.showFormTravel = !this.showFormTravel;
  }
  selectChangeInput(input: string, nexInput: string) {
    const selectBox = this.formTravelGroup.get(input);
    const selectNextBox = this.formTravelGroup.get(nexInput);
    if (selectNextBox.value == 'my_' && selectBox.value == 'my_') {
      alert('No puedes seleccionar tu posición como punto de partida y final');
      selectBox.setValue('select_to_map');
    }
  }

  redirectCard() {
    this.router.navigate(['/']);
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
