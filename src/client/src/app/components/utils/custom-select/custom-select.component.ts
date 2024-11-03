import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BaseCustomInputComponent } from '../base-custom-input/base-custom-input.component';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => this),
      multi: true
    }
  ],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent extends BaseCustomInputComponent {
  // TODO: Comprobar que existe en los objetos entrantes.
  @Input() keyProp = "";

  // TODO: Comprobar que existe en los objetos entrantes.
  @Input() showingProp = "";

  @Input() placeholder = "";

  @Input() options: any[] = [];

  @Input() size?: number;

  @Input() multiple: boolean = false;


  @Input() style?: { [key: string]: string };

  @Input() autocomplete?: string;

  @Input() selectedValue?: any;
}
