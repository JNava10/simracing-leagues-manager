import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  // TODO: Componente o clase generica con atributos y eventos de todos los inputs HTML.

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() additionalClasses: string = '';

  @Input() color: string = "red";

  @Output() click = new EventEmitter<Event>();
  @Output() dblclick = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() mouseenter = new EventEmitter<MouseEvent>();
  @Output() mouseleave = new EventEmitter<MouseEvent>();



  onClick(event: Event) {
    this.click.emit(event);
  }

  onDblClick(event: Event) {
    this.dblclick.emit(event);
  }

  onFocus(event: Event) {
    this.focus.emit(event);
  }

  onBlur(event: Event) {
    this.blur.emit(event);
  }

  onKeydown(event: KeyboardEvent) {
    this.keydown.emit(event);
  }

  onKeyup(event: KeyboardEvent) {
    this.keyup.emit(event);
  }

  onMouseEnter(event: MouseEvent) {
    this.mouseenter.emit(event);
  }

  onMouseLeave(event: MouseEvent) {
    this.mouseleave.emit(event);
  }
}
