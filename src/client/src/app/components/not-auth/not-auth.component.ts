import { Component } from '@angular/core';
import {CustomSolidButtonComponent} from "../utils/button/solid-button/custom-solid-button.component";

@Component({
  selector: 'app-not-auth',
  standalone: true,
  imports: [
    CustomSolidButtonComponent
  ],
  templateUrl: './not-auth.component.html',
  styleUrl: './not-auth.component.scss'
})
export class NotAuthComponent {

}
