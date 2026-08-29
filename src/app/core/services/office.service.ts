import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../config';
import { OfficeItem } from '../models/office.model';

@Injectable({ providedIn: 'root' })
export class OfficeService {
  downloadUrl(item: OfficeItem): string {
    return `${API_BASE_URL}/api/office/${item.id}/download`;
  }
}