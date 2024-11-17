import {Component, ElementRef, inject, Input} from '@angular/core';
import {NgStyle} from "@angular/common";
import colors from 'tailwindcss/colors';
import {GlobalHelper} from "../../../../helpers/global.helper";

@Component({
  selector: 'app-custom-badge',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './custom-badge.component.html',
})
export class CustomBadgeComponent {



  @Input() colorTheme: keyof typeof colors = "blue";
  @Input() text: string = "Badge";

  hexColor = colors[this.colorTheme!];

  protected readonly colors = colors;
  protected readonly globalHelper = inject(GlobalHelper);
}
