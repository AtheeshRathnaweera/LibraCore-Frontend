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
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'borrowing-and-returning',
        loadComponent: () =>
          import(
            './features/borrowing-and-returning/borrowing-and-returning.component'
          ).then((m) => m.BorrowingAndReturningComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'book-management',
        loadComponent: () =>
          import('./features/book-management/book-management.component').then(
            (m) => m.BookManagementComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'user-management',
        loadComponent: () =>
          import('./features/user-management/user-management.component').then(
            (m) => m.UserManagementComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'help-and-support',
        loadComponent: () =>
          import('./features/help-and-support/help-and-support.component').then(
            (m) => m.HelpAndSupportComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'dashboard',
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
