import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/* Precarga solo las rutas de mayor tráfico para acortar la navegación
   sin descargar el panel admin (pesado y con guards). */
const PRELOAD_PATHS = new Set(['templates', 'powerpoint', 'word']);

@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    if (route.data?.['preload'] === false) return of(null);
    if (route.canActivate?.length || route.canActivateChild?.length) return of(null);
    return PRELOAD_PATHS.has(route.path ?? '') ? load() : of(null);
  }
}