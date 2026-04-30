import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { AuthRepository, TokenPort } from './core/domain/repositories/auth.repository';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { AuthHttpRepository } from './infrastructure/http/auth-http.repository';
import { ProductHttpRepository } from './infrastructure/http/product-http.repository';
import { authInterceptor } from './infrastructure/interceptors/auth.interceptor';
import { TokenStorageService } from './infrastructure/storage/token-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none'
        }
      }
    }),

    { provide: AuthRepository, useClass: AuthHttpRepository },
    { provide: TokenPort, useClass: TokenStorageService },
    { provide: ProductRepository, useClass: ProductHttpRepository },
  ]
};
