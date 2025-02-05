import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthCallbackComponent } from './features/auth/auth-callback/auth-callback.component';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { GuestGuard } from './core/guards/guest-guard/guest.guard';
import { NotFoundComponent } from './features/error-pages/not-found/not-found.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
    canActivate: [GuestGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: '**', component: NotFoundComponent },
];
