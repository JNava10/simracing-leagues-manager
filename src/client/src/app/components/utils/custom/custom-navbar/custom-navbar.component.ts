import { Component } from '@angular/core';
import {GlobalHelper} from "../../../../helpers/global.helper";
import {CustomDropdownComponent} from "../../dropdown/custom-dropdown/custom-dropdown.component";

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [
    CustomDropdownComponent
  ],
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.scss'
})
export class CustomNavbarComponent {

  constructor(protected globalHelper: GlobalHelper) {}
}
