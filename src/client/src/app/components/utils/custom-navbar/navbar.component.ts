import { Component } from '@angular/core';
import {GlobalHelper} from "../../../helpers/global.helper";
import {CustomDropdownComponent} from "../dropdown/custom-dropdown/custom-dropdown.component";
import {Router} from "@angular/router";
import {AuthApiService} from "../../../services/api/auth-api.service";
import {AuthData} from "../../../utils/interfaces/auth.interface";

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

  constructor(protected globalHelper: GlobalHelper, protected authService: AuthApiService) {}

  getProfileRoute = () => {
    return `profile/${this.globalHelper.getUserId()}`
  };

  logout = () => {
    this.authService.logout().subscribe(this.handleLogout);
  };

  private handleLogout = (res: AuthData) => {
    if (res.auth) throw new Error('No se ha podido cerrar sesión correctamente')

    this.globalHelper.removeTokens()

    this.globalHelper.navigateFromRoot("login")
  }
}
