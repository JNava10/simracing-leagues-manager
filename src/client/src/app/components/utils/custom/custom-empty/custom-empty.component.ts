import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SoftButtons, CustomButtonComponent} from "../input/custom-button/custom-button.component";

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
  @Input() buttonTheme?:  keyof typeof SoftButtons;

  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit();
  }
}
