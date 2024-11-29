import { Component } from '@angular/core';
import {CustomButtonComponent} from "../utils/custom/input/custom-button/custom-button.component";

@Component({
  selector: 'app-not-auth',
  standalone: true,
  imports: [
    CustomButtonComponent
  ],
  templateUrl: './not-auth.component.html',
  styleUrl: './not-auth.component.scss'
})
export class NotAuthComponent {

}
