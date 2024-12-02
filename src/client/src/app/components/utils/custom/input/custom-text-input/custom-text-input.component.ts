import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BaseCustomInputComponent } from '../base-custom-input/base-custom-input.component';

@Component({
  selector: 'app-custom-text-input',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextInputComponent),
      multi: true
    }
  ],
  templateUrl: './custom-text-input.component.html',
  styleUrl: './custom-text-input.component.scss'
})
export class CustomTextInputComponent extends BaseCustomInputComponent {

  /// Atributos del elemento <input/> ///

  @Input() type: string = 'text';

  @Input() autocomplete: string = 'off';

  @Input() placeholder = 'Placeholder';

  @Input() maxLength? = "";

  @Input() inputmode? = "";

  @Input() pattern?: RegExp | string = "";

  @Input() showPlaceholder? = true;

  @Input() color? = 'blue';

  // @Input() debug? = false;


  /// Eventos del elemento <input/> ///

  @Output() inputChange: EventEmitter<string> = new EventEmitter();

  @Output() inputFocus: EventEmitter<void> = new EventEmitter();

  @Output() inputBlur: EventEmitter<void> = new EventEmitter();

  @Output() inputKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter();

  @Output() inputKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter();


  /// Variables para interactuar con la API de formularios reactivos de angular ///

  onInputKeyUp(event: KeyboardEvent): void {
    this.inputKeyUp.emit(event);
  }

  onInputKeyDown(event: KeyboardEvent): void {
    this.inputKeyDown.emit(event);
  }

  /// Metodos custom ///

  protected managePlaceholder() {
    return this.showPlaceholder && this.placeholder ? this.placeholder : ''
  }
}
