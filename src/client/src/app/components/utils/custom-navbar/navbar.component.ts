import { Component } from '@angular/core';
import {GlobalHelper} from "../../../helpers/global.helper";
import {CustomDropdownComponent} from "../dropdown/custom-dropdown/custom-dropdown.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CustomDropdownComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(protected globalHelper: GlobalHelper) {}

  getProfileRoute = () => {
    return `profile/${this.globalHelper.getUserId()}`
  };
}
