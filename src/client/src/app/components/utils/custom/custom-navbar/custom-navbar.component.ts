import { Component } from '@angular/core';
import {GlobalHelper} from "../../../../helpers/global.helper";

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [],
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.scss'
})
export class CustomNavbarComponent {

  constructor(protected globalHelper: GlobalHelper) {}
}
