import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { environment } from '../../../environments/environment';
import { GeneroDTO } from '../generos';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../compartidos/componentes/modelos/PaginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule, MatPaginatorModule],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {

  generosService = inject(GenerosService);
  generos!: GeneroDTO[];
  columnasAMostrar = ["id", "nombre", "acciones"]
  paginacion: PaginacionDTO = {pagina: 1, recordsPorPagina: 5};
  cantidadTotalRegistros!: number;

  constructor(){
    this.cargarRegistros();
  }

  cargarRegistros(){
    this.generosService.obtenerPaginado(this.paginacion).subscribe((respuesta: HttpResponse<GeneroDTO[]>) => {
      this.generos = respuesta.body as GeneroDTO[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    })
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = {pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize};
    this.cargarRegistros();
  }

  borrar(id:number){
    this.generosService.borrar(id)
    .subscribe(() => {
      this.paginacion = {pagina: 1, recordsPorPagina: 5};
      this.cargarRegistros();
    })
  }

}
