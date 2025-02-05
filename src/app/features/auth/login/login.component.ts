import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth0Service } from '../../../core/services/auth0/auth0.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth0Service: Auth0Service) {
    // Initialize the form with validation
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log("login on submit was called");

    // Disable the form inputs
    this.loginForm.disable();
  }

  async onAuth0Login() {
    const auth0Client = this.auth0Service.getClient();
    auth0Client.loginWithRedirect();
  }
}
