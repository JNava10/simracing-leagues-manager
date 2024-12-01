import {Component, ElementRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgStyle} from "@angular/common";
import colors from 'tailwindcss/colors';
import {GlobalHelper} from "../../../../helpers/global.helper";
import {K} from "@angular/cdk/keycodes";

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
  @Input() textProp: string = "Badge";
  @Input() keyProp?: string;
  @Input() object?: any;
  @Input() deleteBtn? = true;

  @Output() delete = new EventEmitter<any>();

  hexColor = colors[this.colorTheme!];

  protected readonly colors = colors;
  protected readonly globalHelper = inject(GlobalHelper);

  emitDelete = (key: any) => {
    this.delete.emit(key);
  }
}
