import { ChangeDetectionStrategy, Component } from '@angular/core';

let nextId = 0;

/** Background band of the 8-point khatam star, drawn in the --pattern token colour. */
@Component({
  selector: 'app-khatam-pattern',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg aria-hidden="true">
      <defs>
        <pattern [attr.id]="pid" width="56" height="56" patternUnits="userSpaceOnUse">
          <rect x="12" y="12" width="32" height="32" />
          <rect x="12" y="12" width="32" height="32" transform="rotate(45 28 28)" />
          <path d="M0 0L12 12M56 0L44 12M0 56L12 44M56 56L44 44M28 0V5.4M28 56V50.6M0 28H5.4M56 28H50.6" />
        </pattern>
      </defs>
      <rect class="fill" width="100%" height="100%" [attr.fill]="'url(#' + pid + ')'" />
    </svg>
  `,
  styles: `
    :host { position: absolute; inset: 0; pointer-events: none; }
    svg { width: 100%; height: 100%; display: block; }
    pattern rect, pattern path { fill: none; stroke: var(--pattern); stroke-width: 1; }
    .fill { stroke: none; }
  `,
})
export class KhatamPattern {
  protected readonly pid = `khatam-${nextId++}`;
}
