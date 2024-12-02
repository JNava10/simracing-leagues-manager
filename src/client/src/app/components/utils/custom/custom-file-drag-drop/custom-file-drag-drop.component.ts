import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {GlobalHelper} from "../../../../helpers/global.helper";
import {BaseCustomInputComponent} from "../input/base-custom-input/base-custom-input.component";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-custom-file-drag-drop',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    PaginatorModule
  ],
  templateUrl: './custom-file-drag-drop.component.html',
  styleUrl: './custom-file-drag-drop.component.scss'
})
export class CustomFileDragDropComponent extends BaseCustomInputComponent {
  constructor(private globalHelper: GlobalHelper) {
    super();
  }

  protected file?: File;

  triggerFileInput = async ($event: MouseEvent) => {
    $event.preventDefault();
    console.log('a')

    const files = await this.globalHelper.openFileDialog({
      returnFormData: false,
      multiple: false,
      validExtensions: ['jpg','png'],
    }) as FileList;

    this.file = files[0] as File;
  };
}
