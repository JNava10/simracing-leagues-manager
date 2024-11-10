import { Component } from '@angular/core';
import {CustomTextInputComponent} from "../../utils/custom-text-input/custom-text-input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserApiService} from "../../../services/api/user-api.service";
import {CustomButtonComponent} from "../../utils/custom-button/custom-button.component";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CustomTextInputComponent,
    ReactiveFormsModule,
    CustomButtonComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  constructor(private fb: FormBuilder, private userService: UserApiService) {
    this.registerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.maxLength(255)]],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      lastname: ['', [Validators.required, Validators.maxLength(255)]],
      secondLastname: ['', Validators.maxLength(255)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.email, Validators.maxLength(255)]],
      profilePicUrl: ['', Validators.maxLength(255)],
    });
  }

  registerForm: FormGroup;

  onSubmit() {
    if (this.registerForm.valid) {
      // TODO: Coger valores del formulario.
    } else {
      // TODO: Mostrar mensajes de error en campos y alert.
    }

    const userTestData = {
      nickname: "testUser123",
      name: "Juan",
      lastname: "Pérez",
      secondLastname: "Gómez",
      password: "admin1234!",
      email: "testuser@example.com"
    }

    this.userService.register(userTestData).subscribe()
  }
}
