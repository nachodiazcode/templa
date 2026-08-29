import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { API_BASE_URL } from '../config';

@Injectable({ providedIn: 'root' })
export class TemplatePreviewService {
  private http = inject(HttpClient);

  /* El HTML inline de cada plantilla se carga UNA vez y se reusa: evita
     refetchs al volver a una página de detalle y comparte la request
     entre suscriptores simultáneos. */
  private cache = new Map<string, Observable<string | null>>();

  loadRealTemplateHtml(templateId: string): Observable<string | null> {
    const hit = this.cache.get(templateId);
    if (hit) return hit;

    const request = this.http
      .get<{ id: string; html: string }>(
        `${API_BASE_URL}/api/templates/${templateId}/preview-html`,
      )
      .pipe(
        map((res) => res.html),
        catchError(() => of(null)),
        shareReplay({ bufferSize: 1, refCount: false }),
      );

    this.cache.set(templateId, request);
    return request;
  }
}