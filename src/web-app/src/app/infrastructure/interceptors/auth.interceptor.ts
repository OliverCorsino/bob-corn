import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthRepository, TokenPort } from "../../core/domain/repositories/auth.repository";
import { catchError, throwError, switchMap } from "rxjs";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenPort = inject(TokenPort);
    const authRepository = inject(AuthRepository);
    const accessToken = tokenPort.getAccessToken();
    
    const authedReq = accessToken
        ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
        : req;

    return next(authedReq).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                const refresh = tokenPort.getRefreshToken();
                if (!refresh) return throwError(() => err);

                return authRepository.refreshToken(refresh).pipe(
                    switchMap(tokens => {
                        tokenPort.saveTokens(tokens);
                        return next(req.clone({
                            setHeaders: { Authorization: `Bearer ${tokens.accessToken}` }
                        }));
                    }),
                    catchError(refreshErr => {
                        tokenPort.clearTokens();
                        return throwError(() => refreshErr);
                    })
                );
            }
            return throwError(() => err);
        })
    );
};