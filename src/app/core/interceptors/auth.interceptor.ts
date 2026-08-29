import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token && req.url.includes('/api/')) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Sesión expirada/inválida: se limpia el estado local para recargar como invitado.
      const isAuthCall = req.url.includes('/auth/');
      if (err.status === 401 && token && !isAuthCall) {
        auth.handleSessionExpired();
      }
      return throwError(() => err);
    }),
  );
};
