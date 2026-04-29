import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../application/auth/auth.store';

// Protect private routes — redirects to login if unauthenticated
export const authGuard: CanActivateFn = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
    return authStore.isAuthenticated() || router.createUrlTree(['/auth/login']);
};

// Protect public routes — redirects to dashboard if already logged in
export const publicGuard: CanActivateFn = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
    return !authStore.isAuthenticated() || router.createUrlTree(['/dashboard']);
};