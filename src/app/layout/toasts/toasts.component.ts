import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toasts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div class="stack">
      @for (t of toast.toasts(); track t.id) {
        <div class="toast" [class.info]="t.kind === 'info'" (click)="toast.dismiss(t.id)">
          {{ t.message }}
        </div>
      }
    </div>
  `,
  styles: `
    .stack {
      position: fixed; bottom: 24px; right: 24px; z-index: 200;
      display: flex; flex-direction: column; gap: 10px;
    }
    .toast {
      background: var(--toast-bg); border: 1px solid rgba(52, 211, 153, 0.45);
      color: var(--text); font-size: 13.5px; font-weight: 600;
      padding: 13px 18px; border-radius: 12px; cursor: pointer;
      box-shadow: 0 16px 44px -12px rgba(0,0,0,.6);
      animation: pop .3s cubic-bezier(.22,1,.36,1);
      max-width: 340px;
      &.info { border-color: rgba(139, 92, 246, 0.5); }
    }
    @keyframes pop { from { transform: translateY(14px) scale(.96); opacity: 0; } }
  `,
})
export class ToastsComponent {
  readonly toast = inject(ToastService);
}
