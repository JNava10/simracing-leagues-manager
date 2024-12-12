import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {passwordRegex} from "../../../utils/constants/regex.constants";
import {ToggleButtonModule} from "primeng/togglebutton";
import {Button} from "primeng/button";
import {ModeSwitchComponent} from "../../utils/mode-switch/mode-switch.component";
import {CustomValidators} from "../../../utils/custom.validators";
import {NgIf} from "@angular/common";
import {AuthApiService} from "../../../services/api/auth-api.service";
import {LoggedData, LoginData} from "../../../utils/interfaces/auth.interface";
import {GlobalHelper} from "../../../helpers/global.helper";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    ToggleButtonModule,
    FormsModule,
    ModeSwitchComponent,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private authService: AuthApiService,
    private globalHelper: GlobalHelper,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    nickOrEmail: new FormControl('', [Validators.required, CustomValidators.nickOrEmail()]),
    password: new FormControl('', [Validators.required, Validators.pattern(passwordRegex)]),
  }, {updateOn: 'submit'});

  get password() {
    return this.loginForm.get('password')!;
  }

  get nickOrEmail() {
    return this.loginForm.get('nickOrEmail')!;
  }

  handleSubmit = () => {
    if (this.loginForm.invalid) return;

    const {password, nickOrEmail} = this.loginForm.value;
    const data: LoginData = {password: password!};

    if (nickOrEmail && nickOrEmail.includes("@")) {
      data.email = nickOrEmail!;
    } else {
      data.nickname = nickOrEmail!;
    }

    this.authService.login(data)
      .subscribe(loginData => this.handleLogin(loginData))
  };

  private handleLogin = (loggedData: LoggedData) => {
    if (!loggedData.success) {
      throw new Error('No se ha podido iniciar sesión')
    } else if (!loggedData.apiKey) {
      throw new Error('No se ha podido encontrar la API Key al iniciar sesión')
    } else if (!loggedData.socketKey) {
      throw new Error('No se ha podido encontrar el Socket Key al iniciar sesión')
    }

    if (loggedData.success && loggedData.id && loggedData.socketKey) {
      this.globalHelper.saveApiKey(loggedData.apiKey);
      this.globalHelper.saveSocketKey(loggedData.socketKey);

      this.globalHelper.setUserId(loggedData.id);
      this.globalHelper.navigateFromRoot(`strategy`) // POST DEFENSA: Antes se redirigia una ruta que ya no se usa. Ahora se redirige al perfil directamente.
    }
  }
}
