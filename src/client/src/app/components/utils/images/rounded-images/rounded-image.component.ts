import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-rounded-image',
  standalone: true,
  imports: [
    NgClass,
    PaginatorModule
  ],
  templateUrl: './rounded-image.component.html',
  styleUrl: './rounded-image.component.scss'
})
export class RoundedImageComponent {
  @Input() url = "";
  @Input() styleClass = "";
}
