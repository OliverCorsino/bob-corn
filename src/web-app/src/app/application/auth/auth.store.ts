import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { User, UserCredentials } from '../../core/domain/models/auth.model';
import { AuthRepository, TokenPort } from '../../core/domain/repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class AuthStore {
    readonly #authRepository = inject(AuthRepository);
    readonly #tokenPort = inject(TokenPort);
    readonly #router = inject(Router);

    readonly #user = signal<User | null>(this.#restoreUser());
    readonly #isLoading = signal<boolean>(false);
    readonly #error = signal<string | null>(null);

    readonly user = this.#user.asReadonly();
    readonly isLoading = this.#isLoading.asReadonly();
    readonly error = this.#error.asReadonly();
    readonly isAuthenticated = computed(() => !!this.#user());
    readonly userRole = computed(() => this.#user()?.role ?? null);
    readonly userInitials = computed(() => {
        const name = this.#user()?.fullName ?? '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    });

    constructor() {
        effect(() => {
            if (!this.isAuthenticated()) {
                this.#router.navigateByUrl('/auth');
            }
        });
    }

    login(credentials: UserCredentials): void {
        this.#isLoading.set(true);
        this.#error.set(null);

        this.#authRepository.login(credentials).pipe(
            tap(tokens => {
                this.#tokenPort.saveTokens(tokens);
                this.#user.set(this.#tokenPort.decodeUserInfo(tokens.accessToken));
                this.#isLoading.set(false);
            }),
            catchError(err => {
                const msg = err.error?.message ?? 'Invalid credentials.';
                this.#error.set(msg);
                this.#isLoading.set(false);
                return EMPTY;
            })
        ).subscribe();
    }

    logout(): void {
        this.#tokenPort.clearTokens();
        this.#user.set(null);
        this.#router.navigateByUrl('/auth/login');
    }

    #restoreUser(): User | null {
        const token = this.#tokenPort.getAccessToken();
        return token ? this.#tokenPort.decodeUserInfo(token) : null;
    }
}