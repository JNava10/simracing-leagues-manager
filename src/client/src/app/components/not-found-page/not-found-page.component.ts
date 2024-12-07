import { Component } from '@angular/core';
import {SoftButtonComponent} from "../utils/button/soft-button/soft-button.component";
import {GlobalHelper} from "../../helpers/global.helper";

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [
    SoftButtonComponent
  ],
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {

  constructor(private globalHelper: GlobalHelper) {}

  redirectToHome = () => {
    this.globalHelper.navigateFromRoot(`landing`);
  };
}
