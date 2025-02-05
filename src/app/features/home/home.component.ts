import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth0Service } from '../../core/services/auth0/auth0.service';
import { User } from '@auth0/auth0-spa-js';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: User | undefined;

  constructor(private auth0Service: Auth0Service) {
    const auth0Client = this.auth0Service.getClient();

    auth0Client.getUser().then((user) => {
      console.log('user: ' + JSON.stringify(user));
      if (user) {
        this.user = user;
      } else {
        console.error('User is undefined');
      }
    });
    // this.auth0Client.getTokenWithPopup().then((token) => {
    //   console.log('home component: token: ' + token);
    // });
  }

  logout() {
    this.auth0Service.logout();
  }

  getAccessToken() {
    const auth0Client = this.auth0Service.getClient();
    // auth0Client.getTokenSilently().then((token) => {
    //   console.log('home component: token: ' + token);
    // });
    auth0Client.getTokenWithPopup().then((token) => {
      console.log('home component: token: ' + token);
    });
  }
}
