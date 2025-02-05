import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AuthCallbackComponent } from './features/auth/auth-callback/auth-callback.component';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { GuestGuard } from './core/guards/guest-guard/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
    canActivate: [GuestGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];
