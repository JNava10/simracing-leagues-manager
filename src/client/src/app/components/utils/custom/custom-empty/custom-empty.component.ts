import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SoftButtons, CustomSolidButtonComponent} from "../../button/solid-button/custom-solid-button.component";
import colors from "tailwindcss/colors";

@Component({
  selector: 'app-custom-empty',
  standalone: true,
  imports: [
    CustomSolidButtonComponent
  ],
  templateUrl: './custom-empty.component.html',
  styleUrl: './custom-empty.component.scss'
})
export class CustomEmptyComponent {
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = 'Imagen';
  @Input() title: string = 'Titulo';
  @Input() description: string = 'Descripción';
  @Input() buttonText?: string;
  @Input() buttonTheme?:  keyof typeof colors;

  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit();
  }
}
