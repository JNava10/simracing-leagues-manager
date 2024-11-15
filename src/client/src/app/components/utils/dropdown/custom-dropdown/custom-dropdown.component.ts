import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss'
})
export class CustomDropdownComponent<T> {
  @Input() buttonTemplate!: TemplateRef<any>;
  @Input() bodyTemplate!: TemplateRef<T>;

  switchContent = (show: boolean = false) => {
    this.showContent = show;
  }

  onButtonEnter = () => {
    this.switchContent(true);
  }

  onButtonHoverExit = () => {
    this.switchContent(false);
  }


  showContent = false;
}
