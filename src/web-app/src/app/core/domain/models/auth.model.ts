export interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    fullName: string
    role: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}