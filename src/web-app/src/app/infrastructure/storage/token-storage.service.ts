import { Injectable } from "@angular/core";
import { AuthTokens, User } from "../../core/domain/models/auth.model";
import { TokenPort } from "../../core/domain/repositories/auth.repository";


@Injectable({ providedIn: 'root' })
export class TokenStorageService extends TokenPort {
    private readonly ACCESS_KEY = 'access_token';
    private readonly REFRESH_KEY = 'refresh_token';

    getAccessToken = () => localStorage.getItem(this.ACCESS_KEY);

    getRefreshToken = () => localStorage.getItem(this.REFRESH_KEY);

    saveTokens(token: AuthTokens): void {
        localStorage.setItem(this.ACCESS_KEY, token.accessToken);
        localStorage.setItem(this.REFRESH_KEY, token.refreshToken);
    }

    clearTokens(): void {
        localStorage.removeItem(this.ACCESS_KEY);
        localStorage.removeItem(this.REFRESH_KEY);
    }

    decodeUserInfo(token: string): User | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                id: payload.sub,
                email: payload.email,
                fullName: payload.fullName ?? '',
                role: payload.role ?? 'Customer'
            };
        } catch {
            return null;
        }
    }

}