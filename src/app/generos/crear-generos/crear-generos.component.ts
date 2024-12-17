import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { primeraLetraMayuscula } from '../../compartidos/componentes/funciones/validaciones';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDTO } from '../generos';
import { Router } from '@angular/router';
import { GenerosService } from '../generos.service';
import { extraerErrores } from '../../compartidos/componentes/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-generos',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormularioGeneroComponent, MostrarErroresComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.css'
})

export class CrearGenerosComponent {
  
  private router = inject(Router);
  private generosService = inject(GenerosService);
  errores: string[] = [];

  guardarCambios(genero: GeneroCreacionDTO){
    this.generosService.crear(genero).subscribe({
      next: () => {
        this.router.navigate(["/generos"]);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
      
    });
  }
}
