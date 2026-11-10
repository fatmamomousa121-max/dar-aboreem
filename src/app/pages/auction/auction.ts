import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { UiService } from '../../services/ui.service';
import { AgoPipe, ArNumPipe, CountdownPipe, SarPipe, parseArabicInt, sar } from '../../shared/arabic.pipes';
import { KhatamPattern } from '../../shared/khatam-pattern/khatam-pattern';
import { Misbaha } from '../../shared/misbaha/misbaha';

interface Feedback { kind: 'ok' | 'err'; text: string; }

@Component({
  selector: 'app-auction',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Misbaha, KhatamPattern, SarPipe, ArNumPipe, CountdownPipe, AgoPipe],
  templateUrl: './auction.html',
  styleUrl: './auction.scss',
})
export class Auction {
  protected readonly svc = inject(AuctionService);
  private readonly ui = inject(UiService);

  /** Route param `/auction/:id` (bound via withComponentInputBinding). */
  readonly id = input<string>();

  protected readonly lot = computed(() => {
    const lots = this.svc.lots();
    return lots.find(l => l.id === this.id()) ?? lots[0];
  });
  protected readonly remaining = computed(() => this.svc.remaining(this.lot(), this.svc.now()));
  protected readonly ended = computed(() => this.remaining() <= 0);
  protected readonly current = computed(() => this.svc.current(this.lot()));
  protected readonly step = computed(() => this.svc.step(this.current()));
  protected readonly minNext = computed(() => this.svc.minNext(this.lot()));
  protected readonly quickBids = computed(() => [0, 1, 4].map(k => this.minNext() + k * this.step()));

  /** Bid field resets to the new minimum whenever the lot or its price changes. */
  protected readonly amount = linkedSignal(() => String(this.minNext()));
  /** Feedback clears when switching lots. */
  protected readonly feedback = linkedSignal<string | undefined, Feedback | null>({
    source: () => this.lot().id,
    computation: () => null,
  });

  protected submit(event: Event): void {
    event.preventDefault();
    const value = parseArabicInt(this.amount());
    const result = this.svc.placeBid(this.lot().id, value);
    if (result.ok) {
      this.feedback.set({ kind: 'ok', text: `مزايدتك ${sar(value)} هي الأعلى الآن.` });
      this.ui.showToast('تمت المزايدة');
    } else {
      this.feedback.set({ kind: 'err', text: result.error });
    }
  }
}
