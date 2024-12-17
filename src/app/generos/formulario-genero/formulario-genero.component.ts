import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { primeraLetraMayuscula } from '../../compartidos/componentes/funciones/validaciones';
import { GeneroCreacionDTO, GeneroDTO, } from '../generos';

@Component({
  selector: 'app-formulario-genero',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, ],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent implements OnInit{
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  @Input()
  modelo: GeneroDTO | undefined;

  @Output()
  posteoFormulario = new EventEmitter<GeneroCreacionDTO>();
  
  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    nombre : ["", {validators: [Validators.required, primeraLetraMayuscula(), Validators.maxLength(50)]}]
  });


  obtenerErrorCampoNombre(): string {
    let nombre = this.form.controls.nombre;

    if(nombre.hasError("required")){
      return "El campo nombre es requerido";
    }

    if (nombre.hasError("primeraLetraMayuscula")) {
      return nombre.getError("primeraLetraMayuscula").mensaje;
    }

    if(nombre.hasError("maxlength")){
      return `El campo nombre no puede tener mas de ${nombre.getError('maxlength').requiredLength} caracteres`;
    }

    return "";
  }

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }
  
    const genero = this.form.value as GeneroCreacionDTO;
    this.posteoFormulario.emit(genero);
  
  }

}
