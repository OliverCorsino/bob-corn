import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./presentation/auth/auth.routes').then(m => m.AUTH_ROUTES),
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/purchase-product/purchase-product').then(m => m.PurchaseProduct),
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' },
];
