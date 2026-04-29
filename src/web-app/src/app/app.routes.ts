import { Routes } from '@angular/router';
import { publicGuard, authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [publicGuard],   // redirect if already logged in
        loadChildren: () => import('./presentation/auth/auth.routes').then(m => m.AUTH_ROUTES),
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],     // protected route
        loadComponent: () => import('./presentation/dashboard/dashboard').then(m => m.Dashboard),
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' },
];
