import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CustomTextInputComponent} from "../custom-text-input/custom-text-input.component";

@Component({
  selector: 'app-custom-search-input',
  standalone: true,
  imports: [
    CustomTextInputComponent
  ],
  templateUrl: './custom-search-input.component.html',
  styleUrl: './custom-search-input.component.scss'
})
export class CustomSearchInputComponent {
  @Input() placeholder: string | undefined;

  /**
   * Tiempo en milisegundos que tardará el input en lanzar el evento de busqueda
   */
  @Input() searchMilis: number | undefined = 325;

  /**
   * Evento que se lanzará al terminar de teclear
   */
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  @Input() showPlaceholder: boolean = false;

  searchTimeout: any = null;

  onSearchChange = (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement;

    // Al igual que en otros componentes, lo que se pretende conseguir con este timeout es
    // lanzar el evento que queramos solo cuando el usuario haya parado de teclear.

    // Si el usuario continua escribiendo volverá a entrar a la funcion, por lo que hay que borrar el timeout para evitar uno por cada vez que se escriba.
    clearTimeout(this.searchTimeout);

    // Se crea de nuevo el timeout. Si pasa el tiempo (el usuario ha dejado de escribir), se lanzará el evento.
    this.searchTimeout = setTimeout(() => {this.onSearch.emit(input.value)}, this.searchMilis)
  }
}
