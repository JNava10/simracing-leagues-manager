import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColorTheme, CustomButtonComponent} from "../../custom-button/custom-button.component";

@Component({
  selector: 'app-custom-empty',
  standalone: true,
  imports: [
    CustomButtonComponent
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
  @Input() buttonTheme?:  keyof typeof ColorTheme;

  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit();
  }
}
