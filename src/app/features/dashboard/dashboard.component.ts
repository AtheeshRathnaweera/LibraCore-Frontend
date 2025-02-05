import { Component } from '@angular/core';
import { Auth0Service } from '../../core/services/auth0/auth0.service';
import { User } from '@auth0/auth0-spa-js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
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
