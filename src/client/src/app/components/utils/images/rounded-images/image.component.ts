import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    NgClass,
    PaginatorModule
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input() url = "";
  @Input() styleClass = "";
  @Input() type: keyof typeof ImageType = "Rounded";

  getType = () => ImageType[this.type];
}

export enum ImageType {
  Circular = "rounded-full",
  Rounded = "rounded-3xl",
  Square = "rounded-none",
}
