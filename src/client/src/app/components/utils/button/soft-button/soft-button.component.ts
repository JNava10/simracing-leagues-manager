import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {ButtonBorder} from "../solid-button/custom-solid-button.component";
import colors from "tailwindcss/colors";
import {GlobalHelper} from "../../../../helpers/global.helper";

@Component({
  selector: 'app-soft-button',
  standalone: true,
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './soft-button.component.html',
})
export class SoftButtonComponent {
  constructor(protected globalHelper: GlobalHelper) {}

  @Input() styleClass: string = '';
  @Input() border?: keyof typeof ButtonBorder;
  @Input() color?: keyof typeof colors; // Con keyof se obtienen las palabras clave del enum. Es mas comodo usarlo para evitar ponerlos a mano.

  protected readonly borders = ButtonBorder;
  protected readonly colors = colors;
}
