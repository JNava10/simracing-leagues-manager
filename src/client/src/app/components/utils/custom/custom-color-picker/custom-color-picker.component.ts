import {Component, forwardRef, OnInit} from '@angular/core';
import {BaseCustomInputComponent} from "../input/base-custom-input/base-custom-input.component";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgxColorsModule} from "ngx-colors";
import {NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-custom-color-picker',
  standalone: true,
  imports: [
    NgxColorsModule,
    NgClass,
    PaginatorModule,
    NgIf
  ],
  templateUrl: './custom-color-picker.component.html',
  styleUrl: './custom-color-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomColorPickerComponent),
      multi: true
    }
  ],
})
export class CustomColorPickerComponent extends BaseCustomInputComponent {}
