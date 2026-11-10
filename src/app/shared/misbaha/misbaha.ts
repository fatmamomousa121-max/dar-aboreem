import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BeadCount, MisbahaLook } from '../../models/misbaha.model';

let nextId = 0;

interface Bead { i: number; x: number; y: number; r: number; sep: boolean; }

const CX = 100, CY = 98, RX = 72, RY = 84;
const IMAM_Y = CY + RY + 6;

/**
 * Draws a misbaha as SVG: a loop of beads, two separator beads (الفواصل),
 * the imam bead (الإمام) and a tassel. `filled` highlights the first N beads
 * (used by the tasbih counter).
 */
@Component({
  selector: 'app-misbaha',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.viewBox]="'0 0 200 ' + (imamY + 64)" role="img" [attr.aria-label]="label()">
      <defs>
        <radialGradient [attr.id]="gid" cx="35%" cy="30%" r="70%">
          <stop offset="0" [attr.stop-color]="look().colors[0]" />
          <stop offset=".55" [attr.stop-color]="look().colors[1]" />
          <stop offset="1" [attr.stop-color]="look().colors[2]" />
        </radialGradient>
      </defs>
      <ellipse [attr.cx]="cx" [attr.cy]="cy" [attr.rx]="rx" [attr.ry]="ry" fill="none"
               [attr.stroke]="look().colors[2]" stroke-opacity=".35" stroke-width="1" />
      @for (b of beads(); track b.i) {
        <circle class="bead" [class.done]="b.i < filled()"
                [attr.cx]="b.x" [attr.cy]="b.y" [attr.r]="b.r"
                [attr.fill]="b.sep && look().separator ? look().separator : fill" />
      }
      <rect x="93" [attr.y]="imamY - 6" width="14" height="32" rx="7" [attr.fill]="fill" />
      <circle cx="100" [attr.cy]="imamY + 27" r="3.5" [attr.fill]="tassel()" />
      @for (d of tasselPaths; track d) {
        <path [attr.d]="d" [attr.stroke]="tassel()" stroke-width="1.4" fill="none" />
      }
    </svg>
  `,
  styles: `
    :host { display: block; width: 100%; height: 100%; }
    svg { width: 100%; height: 100%; display: block; }
    .bead { transition: fill .25s; }
    .bead.done { fill: var(--accent); }
  `,
})
export class Misbaha {
  readonly look = input.required<MisbahaLook>();
  readonly count = input<BeadCount>(33);
  readonly filled = input(0);
  readonly label = input('سبحة');

  protected readonly cx = CX; protected readonly cy = CY;
  protected readonly rx = RX; protected readonly ry = RY;
  protected readonly imamY = IMAM_Y;
  protected readonly gid = `bead-grad-${nextId++}`;
  protected readonly fill = `url(#${this.gid})`;
  protected readonly tassel = computed(() => this.look().tassel ?? 'var(--accent)');

  protected readonly tasselPaths = [-3, -2, -1, 0, 1, 2, 3].map(
    k => `M100 ${IMAM_Y + 26} Q${100 + k * 2} ${IMAM_Y + 40} ${100 + k * 4.2} ${IMAM_Y + 58}`,
  );

  protected readonly beads = computed<Bead[]>(() => {
    const n = this.count();
    const r = n > 40 ? 4.1 : 7.6;
    const gap = n > 40 ? 0.34 : 0.5;
    const seps = n === 33 ? [11, 22] : [33, 66];
    return Array.from({ length: n }, (_, i) => {
      const t = gap + (2 * Math.PI - 2 * gap) * (i / (n - 1));
      const sep = seps.includes(i);
      return {
        i, sep,
        x: +(CX + RX * Math.sin(t)).toFixed(1),
        y: +(CY + RY * Math.cos(t)).toFixed(1),
        r: sep ? r * 0.8 : r,
      };
    });
  });
}
