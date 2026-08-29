import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';

export interface CouponValidation {
  valid: boolean;
  error?: string;
  code?: string;
  type?: 'percent' | 'fixed';
  value?: number;
  discount?: number;
  total?: number;
}

@Injectable({ providedIn: 'root' })
export class CouponsService {
  private http = inject(HttpClient);

  validate(code: string, amount: number): Observable<CouponValidation> {
    return this.http.post<CouponValidation>(`${API_BASE_URL}/api/coupons/validate`, {
      code,
      amount,
    });
  }
}
