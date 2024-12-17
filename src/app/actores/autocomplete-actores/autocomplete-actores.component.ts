import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable, MatTableModule } from '@angular/material/table';
import { actorAutoCompleteDTO } from '../actores';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-autocomplete-actores',
  standalone: true,
  imports: [DragDropModule, MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css'
})
export class AutocompleteActoresComponent {
  control = new FormControl();

  actores: actorAutoCompleteDTO[] = [
    {
    id: 1, nombre: "Tom Holland", personaje: "", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg"
    },
    {
      id: 2, nombre: "Tom Hanks", personaje: "", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg"
    },
    {
      id: 3, nombre: "Samuel L. Jackson", personaje: "", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg"
    },

  ];

  @Input({required: true})
  actoresSeleccionados: actorAutoCompleteDTO[] = [];

  columnasAMostrar = ["imagen", "nombre", "personaje", "acciones"];

  @ViewChild(MatTable) table!: MatTable<actorAutoCompleteDTO>; 

  actorSeleccionado(event: MatAutocompleteSelectedEvent) {
    const selectedActor = event.option.value;
    const alreadySelected = this.actoresSeleccionados.some(actor => actor.id === selectedActor.id);

    if (!alreadySelected) {
      this.actoresSeleccionados.push(selectedActor);
      this.control.patchValue("");

      if (this.table != undefined) {
        this.table.renderRows();
      }
    } else if (alreadySelected) {
      this.control.patchValue("");
    }
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(actor: actorAutoCompleteDTO){
    const indice = this.actoresSeleccionados.findIndex((a: actorAutoCompleteDTO) => a.id === actor.id);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

}