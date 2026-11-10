import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MisbahaLook } from '../../../models/misbaha.model';
import { ArNumPipe } from '../../../shared/arabic.pipes';
import { Misbaha } from '../../../shared/misbaha/misbaha';

const PHRASES = ['سُبْحَانَ اللّٰه', 'الْحَمْدُ لِلّٰه', 'اللّٰهُ أَكْبَر'];
const TOTAL = 99;

/** Interactive after-prayer tasbih: 33 × three phrases. */
@Component({
  selector: 'app-tasbih',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Misbaha, ArNumPipe],
  templateUrl: './tasbih.html',
  styleUrl: './tasbih.scss',
})
export class Tasbih {
  protected readonly look: MisbahaLook = { colors: ['#FFE2AE', '#D9952F', '#8A5410'] };
  protected readonly count = signal(0);
  protected readonly finished = computed(() => this.count() >= TOTAL);
  protected readonly filled = computed(() => (this.finished() ? 33 : this.count() % 33));
  protected readonly phrase = computed(() =>
    this.finished() ? 'لا إله إلا الله' : PHRASES[Math.floor(this.count() / 33)],
  );
  protected readonly phases = [0, 1, 2];

  tick(): void {
    if (!this.finished()) this.count.update(c => c + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
