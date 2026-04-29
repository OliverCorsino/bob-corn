import { Observable } from "rxjs";
import { UserCredentials, AuthTokens } from "../../core/domain/models/auth.model";
import { AuthRepository } from "../../core/domain/repositories/auth.repository";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../enviroments/enviroment";

@Injectable({ providedIn: 'root' })
export class AuthHttpRepository extends AuthRepository {
    readonly #http = inject(HttpClient);
    readonly #apiUrl = `${environment.apiUrl}/auth`;

    login(credentials: UserCredentials): Observable<AuthTokens> {
        return this.#http.post<AuthTokens>(`${this.#apiUrl}/login`, credentials);
    }

    logout(): Observable<void> {
        return this.#http.post<void>(`${this.#apiUrl}/logout`, {});
    }

    refreshToken(token: string): Observable<AuthTokens> {
        return this.#http.post<AuthTokens>(`${this.#apiUrl}/refresh`, { refreshToken: token });
    }

}