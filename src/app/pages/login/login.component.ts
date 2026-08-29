import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly mode = signal<'login' | 'register'>('login');
  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirm = signal('');
  readonly showPassword = signal(false);
  readonly loading = signal(false);
  readonly error = signal('');

  private returnUrl(): string | undefined {
    const raw = this.route.snapshot.queryParamMap.get('returnUrl') || undefined;
    if (raw && raw.startsWith('/')) return raw;
    return undefined;
  }

  setMode(mode: 'login' | 'register'): void {
    this.mode.set(mode);
    this.error.set('');
    this.confirm.set('');
  }

  submit(e: Event): void {
    e.preventDefault();
    if (this.loading()) return;

    const email = this.email().trim();
    const password = this.password();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.error.set('Ingresa un email válido.');
      return;
    }
    if (password.length < 6) {
      this.error.set('La contraseña necesita al menos 6 caracteres.');
      return;
    }
    if (this.mode() === 'register') {
      if (!this.name().trim()) {
        this.error.set('Ingresa tu nombre.');
        return;
      }
      if (password !== this.confirm()) {
        this.error.set('Las contraseñas no coinciden.');
        return;
      }
    }

    this.error.set('');
    this.loading.set(true);

    const request =
      this.mode() === 'login'
        ? this.auth.login(email, password)
        : this.auth.register(this.name().trim(), email, password);

    request.subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl(this.returnUrl() || '/mis-compras');
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.error || 'Algo salió mal. Intenta de nuevo.');
      },
    });
  }
}
