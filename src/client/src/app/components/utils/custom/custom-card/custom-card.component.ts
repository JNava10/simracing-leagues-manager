import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomButtonComponent} from "../../custom-button/custom-button.component";

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [
    CustomButtonComponent
  ],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss'
})
export class CustomCardComponent {
  @Input() title: string = 'Titulo';
  @Input() subtitle?: string = 'Subtitulo';
  @Input() content: string = 'Contenido';
  @Input() linkText?: string = 'Default Link Text';
  @Input() link?: string;
  @Input() showCloseBtn?: boolean = false;

  @Output() onCloseBtn = new EventEmitter<void>();

  emitClosing() {
    this.onCloseBtn.emit();
  }
}
