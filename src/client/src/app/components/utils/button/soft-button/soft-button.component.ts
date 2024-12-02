import {Component, Input, OnInit} from '@angular/core';
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
export class SoftButtonComponent implements OnInit {
  constructor(protected globalHelper: GlobalHelper) {}

  @Input() styleClass: string = '';
  @Input() border?: keyof typeof ButtonBorder = "MediumRounded";
  @Input() color?: keyof typeof colors; // Con keyof se obtienen las palabras clave del enum. Es mas comodo usarlo para evitar ponerlos a mano.

  hovered = false;

  idleStyle = {};
  hoverStyle = {};

  ngOnInit(): void {
    if (this.color) {
      this.idleStyle = {
        'background-color': this.globalHelper.getHexWithAlpha(colors[this.color][800], 30),
        'color': colors[this.color][500]
      }

      this.hoverStyle = {
        'background-color': this.globalHelper.getHexWithAlpha(colors[this.color][800], 60),
        'color': colors[this.color][500]
      }
    }
  }


  get buttonStyle() {
    return this.hovered ? this.hoverStyle : this.idleStyle;
  }

  protected readonly borders = ButtonBorder;
  protected readonly colors = colors;
}
