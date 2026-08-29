import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { filter, switchMap, take } from 'rxjs';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.initDone$.pipe(
    filter((done) => done),
    take(1),
    switchMap(() =>
      auth.user()?.role === 'admin'
        ? of(true)
        : of(router.createUrlTree(['/'])),
    ),
  );
};
