import { Observable } from "rxjs";
import { AuthTokens, User, UserCredentials } from "../models/auth.model";

export abstract class AuthRepository {
    abstract login(credentials: UserCredentials): Observable<AuthTokens>;
    abstract logout(): Observable<void>;
    abstract refreshToken(token: string): Observable<AuthTokens>;
}

export abstract class TokenPort {
    abstract getAccessToken(): string | null;
    abstract getRefreshToken(): string | null;
    abstract saveTokens(token: AuthTokens): void;
    abstract clearTokens(): void;
    abstract decodeUserInfo(token: string): User | null;
}