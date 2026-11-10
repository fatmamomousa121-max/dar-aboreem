import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div aria-live="polite">
      @if (ui.toast(); as text) { <div class="toast">{{ text }}</div> }
    </div>
  `,
  styles: `
    .toast {
      position: fixed; left: 50%; transform: translateX(-50%);
      bottom: calc(20px + env(safe-area-inset-bottom, 0px));
      background: var(--ink); color: var(--bg); font-family: var(--f-kufi);
      padding: 8px 20px; border-radius: 999px; z-index: 50;
    }
  `,
})
export class Toast {
  protected readonly ui = inject(UiService);
}
