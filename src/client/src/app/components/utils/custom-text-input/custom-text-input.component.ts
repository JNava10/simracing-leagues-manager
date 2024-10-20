import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  selector: 'app-custom-text-input',
  standalone: true,
  imports: [FormsModule, NgClass],
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
export class CustomTextInputComponent implements ControlValueAccessor {


  /// Atributos del elemento <input/> ///

  @Input() type: string = 'text';

  @Input() disabled: boolean = false;

  @Input() required: boolean = false;

  @Input() readonly: boolean = false;

  @Input() autocomplete: string = 'off';

  @Input() placeholder = 'Placeholder';

  @Input() maxLength = "";

  @Input() showPlaceholder? = false;

  @Input() showLabel = true;

  @Input() label = 'Label';

  @Input() formGroupName?: string;

  @Input() formControlName?: string;


  /// Atributos custom ///

  @Input() errorMessage: string = '';

  @Input() inputClass: string = '';

  @Input() color? = 'blue';

  @Input() debug? = false;


  /// Eventos del elemento <input/> ///

  @Output() inputChange: EventEmitter<string> = new EventEmitter();

  @Output() inputFocus: EventEmitter<void> = new EventEmitter();

  @Output() inputBlur: EventEmitter<void> = new EventEmitter();

  @Output() inputKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter();

  @Output() inputKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter();


  /// Variables para interactuar con la API de formularios reactivos de angular ///

  protected value = ''; // Es mejor utilizar una variable privada, ya que asi podemos controlar exactamente cuando se sobreescribe el valor del input.

  private onReactiveChange = (value: string) => {};
  private onReactiveTouched = () => {};


  /// Handlers de los eventos ///

  onInputChange(event: Event): void {
    this.inputChange.emit((<HTMLInputElement>event.target).value);
  }

  onInputFocus(): void {
    this.inputFocus.emit();
  }

  onInputBlur(): void {
    this.inputBlur.emit();
  }

  onInputKeyUp(event: KeyboardEvent): void {
    this.inputKeyUp.emit(event);
  }

  onInputKeyDown(event: KeyboardEvent): void {
    this.inputKeyDown.emit(event);
  }

  updateValue(event: Event): void {
    const newValue = (<HTMLInputElement>event.target).value;

    this.value = newValue;
    this.onReactiveChange(newValue);
    this.onReactiveTouched();
  }

  /// Metodos heredados para soportar los formularios reactivos /// Fuente: https://dev.to/krishhnaa/understanding-angular-controlvalueaccessor-with-an-example-33gb

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
      console.log(this.value)
    }
  }

  registerOnChange(fn: any): void {
    if (this.debug) {
      console.log(this.value);
    }

    this.onReactiveChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onReactiveTouched = fn;
  }

  onReactiveBlur() {
    this.onReactiveTouched();
  }


  /// Metodos custom ///

  protected managePlaceholder() {
    return this.showPlaceholder ? this.placeholder : ''
  }
}
