import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';

export interface ReviewSummary {
  rating: number;
  reviews: number;
  distribution: Record<number, number>;
}

export interface TemplateReview {
  id: string;
  templateId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

interface ReviewsResponse {
  templateId: string;
  summary: ReviewSummary;
  items: TemplateReview[];
}

interface CreateReviewResponse {
  review: TemplateReview;
  summary: ReviewSummary;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private http = inject(HttpClient);

  list(templateId: string): Observable<ReviewsResponse> {
    return this.http.get<ReviewsResponse>(`${API_BASE_URL}/api/templates/${templateId}/reviews`);
  }

  create(
    templateId: string,
    review: { rating: number; title: string; body: string },
  ): Observable<CreateReviewResponse> {
    return this.http.post<CreateReviewResponse>(
      `${API_BASE_URL}/api/templates/${templateId}/reviews`,
      review,
    );
  }
}
