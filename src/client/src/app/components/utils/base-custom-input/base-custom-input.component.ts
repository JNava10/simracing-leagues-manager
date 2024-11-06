import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorTheme } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-base-custom-input',
  standalone: true,
  imports: [],
  templateUrl: './base-custom-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseCustomInputComponent),
      multi: true
    }
  ],
})
export class BaseCustomInputComponent implements ControlValueAccessor {

  protected value: any;

  /// Atributos genericos de los inputs ///

  @Input() id?: string;

  @Input() name?: string;

  @Input() disabled: boolean = false;

  @Input() required: boolean = false;

  @Input() readonly: boolean = false;

  @Input() showLabel = true;

  @Input() label = 'Label';

  @Input() formGroupName = "";

  @Input() formControlName = "";

  @Input() styleClass = "";

  /// Atributos custom ///

  @Input() errorMessage: string = '';

  @Input() inputClass: string = '';

  @Input() themeName!: keyof typeof ColorTheme; // Con keyof se obtienen las palabras clave del enum. Es mas comodo usarlo para evitar ponerlos a mano.

  @Input() debug? = false;

  writeValue(value: string): void {
    if (value !== undefined) {
      this.updateValue(value)
    }
  }

  private onReactiveChange = (value: any) => {};
  private onReactiveTouched = () => {};

  registerOnChange(fn: any): void {
    this.onReactiveChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onReactiveTouched = fn;
  }

  onReactiveBlur() {
    this.onReactiveTouched();
  }


  updateValue(value: any): void {
    this.value = value;

    if (this.debug) {
      console.log(this.value);
    }

    this.onReactiveChange(value);
    this.onReactiveTouched();
  }
}
