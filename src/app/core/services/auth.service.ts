import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../config';
import { OrderStatus } from './checkout.service';

export interface MeUser {
  id: string;
  email: string;
  name: string | null;
  role: 'user' | 'admin';
}

interface AuthResponse {
  token: string;
  user: MeUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private static readonly TOKEN_KEY = 'templa.token';

  readonly user = signal<MeUser | null>(null);
  readonly initDone$ = new BehaviorSubject<boolean>(false);

  constructor() {
    const token = this.getToken();
    if (!token) {
      this.initDone$.next(true);
      return;
    }
    this.http
      .get<{ user: MeUser }>(`${API_BASE_URL}/api/auth/me`)
      .subscribe({
        next: ({ user }) => {
          this.user.set(user);
          this.initDone$.next(true);
        },
        error: () => {
          this.clearToken();
          this.user.set(null);
          this.initDone$.next(true);
        },
      });
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_BASE_URL}/api/auth/login`, { email, password })
      .pipe(tap((res) => this.acceptSession(res)));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_BASE_URL}/api/auth/register`, { name, email, password })
      .pipe(tap((res) => this.acceptSession(res)));
  }

  logout(): void {
    this.user.set(null);
    this.clearToken();
  }

  /** Limpia la sesión cuando el servidor responde 401 (token vencido). */
  handleSessionExpired(): void {
    this.user.set(null);
    this.clearToken();
  }

  myOrders(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(`${API_BASE_URL}/api/my/orders`);
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(AuthService.TOKEN_KEY);
    } catch {
      return null;
    }
  }

  private acceptSession(res: AuthResponse): void {
    try {
      localStorage.setItem(AuthService.TOKEN_KEY, res.token);
    } catch {
      /* almacenamiento no disponible */
    }
    this.user.set(res.user);
  }

  private clearToken(): void {
    try {
      localStorage.removeItem(AuthService.TOKEN_KEY);
    } catch {
      /* almacenamiento no disponible */
    }
  }
}
