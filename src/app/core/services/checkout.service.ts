import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../config';

export interface CheckoutStart {
  url: string;
  token: string;
  orderId: string;
}

export interface OrderStatus {
  orderId: string;
  status: 'pending' | 'paid' | 'rejected' | 'canceled';
  amount: number;
  currency: string;
  gross: number;
  discount: number;
  couponCode: string | null;
  items: { id: string; name: string; price: number }[];
  createdAt: string;
  paidAt: string | null;
  authorizationCode: string | null;
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private http = inject(HttpClient);

  /**
   * Crea la transacción en Transbank y envía al navegador al formulario
   * de Webpay (POST token_ws) — así lo exige el flujo de Webpay Plus.
   */
  start(items: string[], email: string, coupon?: string | null): Observable<CheckoutStart> {
    return this.http
      .post<CheckoutStart>(`${API_BASE_URL}/api/checkout`, { items, email, coupon })
      .pipe(tap((res) => this.redirectToWebpay(res)));
  }

  order(orderId: string): Observable<OrderStatus> {
    return this.http.get<OrderStatus>(`${API_BASE_URL}/api/order/${orderId}`);
  }

  downloadUrl(orderId: string, itemId: string): string {
    return `${API_BASE_URL}/api/download/order/${orderId}/${itemId}`;
  }

  freeDownloadUrl(itemId: string): string {
    return `${API_BASE_URL}/api/download/free/${itemId}`;
  }

  private redirectToWebpay({ url, token }: CheckoutStart): void {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'token_ws';
    input.value = token;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }
}
