import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Service } from '../../../core/services/auth0/auth0.service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css',
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private auth0Service: Auth0Service
  ) {}

  ngOnInit(): void {
    const auth0Client = this.auth0Service.getClient();

    auth0Client.handleRedirectCallback().then((response) => {
      console.log('auth-callback component: handleRedirectCallback:', response);
      this.router.navigate(['/']);
    });
  }
}
