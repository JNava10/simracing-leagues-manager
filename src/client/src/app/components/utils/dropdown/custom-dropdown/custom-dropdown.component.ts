import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgClass,
    NgIf
  ],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss'
})
export class CustomDropdownComponent<T> {
  @Input() buttonTemplate!: TemplateRef<any>;
  @Input() bodyTemplate!: TemplateRef<T>;
  @Input() options: { label: string, value: any }[] = []; // List of dropdown options
  @Input() placeholder: string = 'Select an option'; // Placeholder text
  @Input() selectedValue: any = null; // Preselected value
  @Output() selectionChange = new EventEmitter<any>(); // Emit when the selection changes


  switchContent = (show: boolean = false) => {
    this.showContent = show;
  }

  onButtonEnter = () => {
    this.switchContent(true);
  }

  onButtonHoverExit = () => {
    this.switchContent(false);
  }


  isOpen = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: { label: string, value: any }): void {
    this.selectedValue = option.value;
    this.selectionChange.emit(option.value);
    this.isOpen = false; // Close dropdown after selection
  }

  get selectedLabel(): string {
    const selectedOption = this.options.find(option => option.value === this.selectedValue);
    return selectedOption ? selectedOption.label : this.placeholder;
  }

  showContent = false;
}
