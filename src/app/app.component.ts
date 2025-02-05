import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth0Service } from './core/services/auth0/auth0.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user/user.reducer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'LibraCore.Frontend';

  constructor(private auth0Service: Auth0Service) {
    console.log('AppComponent triggered');
  }

  ngOnInit(): void {
    this.auth0Service.initializeUser();
  }
}
