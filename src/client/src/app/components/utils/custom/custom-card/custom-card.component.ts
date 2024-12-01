import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomSolidButtonComponent} from "../../button/solid-button/custom-solid-button.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [
    CustomSolidButtonComponent,
    NgIf
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

  @Input() showTitle?: boolean = true;
  @Input() showSubtitle?: boolean = true;
  @Input() showContent?: boolean = true;
  @Input() showImage?: boolean = false;

  @Output() onCloseBtn = new EventEmitter<void>();

  emitClosing() {
    this.onCloseBtn.emit();
  }
}
