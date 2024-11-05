import {Component, EventEmitter, forwardRef, Input, input, Output} from '@angular/core';
import {BaseCustomInputComponent} from "../../base-custom-input/base-custom-input.component";
import {NG_VALUE_ACCESSOR, RadioControlValueAccessor} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-custom-radio-group',
  standalone: true,
  imports: [
    PaginatorModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => this),
      multi: true
    }
  ],
  templateUrl: './custom-radio-group.component.html',
  styleUrl: './custom-radio-group.component.scss'
})
export class CustomRadioGroupComponent extends BaseCustomInputComponent {
  @Input() options: string[] | number[] = [];
  selected: number = -1; // Se pone -1 por que es un valor que nunca va a existir en un array. Asi se podrá comprobar si se ha definido el valor seleccionado.

  groupName = uuidv4()

  getSelectedLabel() {
    if (this.selected < 0) {
      return;
    }

    return this.options[this.selected];
  }

  select(index: number): void {
    this.selected = index;
    this.updateValue(index)
  }
}
