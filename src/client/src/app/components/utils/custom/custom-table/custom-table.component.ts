import {Component, Input} from '@angular/core';
import {SoftColors} from "../input/custom-button/custom-button.component";

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
}

export interface TableColumn<T, P = void> {
  label: string
  key: keyof T
  parent?: keyof P
}

