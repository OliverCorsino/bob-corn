import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../application/auth/auth.store';

export const authGuard: CanActivateFn = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
    
    if (!authStore.isAuthenticated()) {
        return router.navigate(['/auth/login']);
    }
    return true;
};
