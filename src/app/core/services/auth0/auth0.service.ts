import { Injectable } from '@angular/core';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  private auth0Client!: Auth0Client;

  constructor() {
    this.initializeAuth0Client();
  }

  private async initializeAuth0Client(): Promise<void> {
    this.auth0Client = new Auth0Client({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience,
      },
    });
  }

  getClient(): Auth0Client {
    return this.auth0Client;
  }

  async logout(): Promise<void> {
    await this.auth0Client.logout({
      logoutParams: {
        returnTo: environment.auth0.logoutUrl,
      },
    });
  }
}
