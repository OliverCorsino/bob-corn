import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './infrastructure/interceptors/auth.interceptor';
import { AuthRepository, TokenPort } from './core/domain/repositories/auth.repository';
import { AuthHttpRepository } from './infrastructure/http/auth-http.repository';
import { TokenStorageService } from './infrastructure/storage/token-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),

    { provide: AuthRepository, useClass: AuthHttpRepository},
    { provide: TokenPort, useClass: TokenStorageService}
  ]
};
