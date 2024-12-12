import { Component } from '@angular/core';
import {SoftButtonComponent} from "../utils/button/soft-button/soft-button.component";
import {GlobalHelper} from "../../helpers/global.helper";
import {AuthApiService} from "../../services/api/auth-api.service";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    SoftButtonComponent
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  constructor(protected globalHelper: GlobalHelper) {}

  goToLogin = () => {
    this.globalHelper.navigateFromRoot('login')
  }
}
