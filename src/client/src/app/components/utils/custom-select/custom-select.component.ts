import { Component, Input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [DropdownModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
    @Input() id?: string;

    @Input() name?: string;

    @Input() required: boolean = false;

    // TODO: Comprobar que existe en los objetos entrantes.
    @Input() keyProp = "";

    // TODO: Comprobar que existe en los objetos entrantes.
    @Input() showingProp = "";

    @Input() disabled: boolean = false;

    @Input() value?: any;

    @Input() label = "";

    @Input() placeholder = "";

    @Input() options: any[] = [];

    @Input() size?: number;

    @Input() multiple: boolean = false;

    @Input() class?: string;

    @Input() style?: { [key: string]: string };

    @Input() autocomplete?: string;

    @Input() selectedValue?: any;

}
