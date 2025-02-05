import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth0Service } from '../../services/auth0/auth0.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private auth0Service: Auth0Service, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.auth0Service
      .getClient()
      .isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
