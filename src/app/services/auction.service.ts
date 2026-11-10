import { Injectable, signal } from '@angular/core';
import { createLots } from '../data/mock-data';
import { Lot } from '../models/misbaha.model';
import { sar } from '../shared/arabic.pipes';

export type BidResult = { ok: true } | { ok: false; error: string };

const MIN = 60_000;
/** A bid in the final minute extends the lot by this much. */
const ANTI_SNIPE_MS = 2 * MIN;

/**
 * Auction state. Everything is local for now; for a real auction,
 * load lots over HTTP and receive other people's bids over a WebSocket.
 */
@Injectable({ providedIn: 'root' })
export class AuctionService {
  private readonly _lots = signal<Lot[]>(createLots(Date.now()));
  readonly lots = this._lots.asReadonly();

  /** Ticks every second; read it in templates to drive countdowns. */
  readonly now = signal(Date.now());

  constructor() {
    setInterval(() => this.now.set(Date.now()), 1000);
  }

  byId(id: string): Lot | undefined {
    return this._lots().find(l => l.id === id);
  }

  current(lot: Lot): number {
    return lot.bids[0]?.amount ?? lot.startPrice;
  }

  /** Bid increment ladder. */
  step(value: number): number {
    return value < 5000 ? 100 : value < 20000 ? 250 : 500;
  }

  minNext(lot: Lot): number {
    return lot.bids.length ? this.current(lot) + this.step(this.current(lot)) : lot.startPrice;
  }

  remaining(lot: Lot, now = this.now()): number {
    return lot.endsAt - now;
  }

  placeBid(lotId: string, amount: number): BidResult {
    const lot = this.byId(lotId);
    const now = Date.now();
    if (!lot) return { ok: false, error: 'لم نجد هذه القطعة.' };
    if (lot.endsAt <= now) return { ok: false, error: 'انتهى هذا المزاد ولم يعد يقبل مزايدات.' };
    if (!Number.isFinite(amount)) return { ok: false, error: 'اكتب مبلغ المزايدة بالأرقام.' };
    const min = this.minNext(lot);
    if (amount < min) return { ok: false, error: `المبلغ أقل من الحد الأدنى. زايد بـ ${sar(min)} أو أكثر.` };

    this._lots.update(lots =>
      lots.map(l =>
        l.id !== lotId ? l : {
          ...l,
          endsAt: l.endsAt - now < MIN ? l.endsAt + ANTI_SNIPE_MS : l.endsAt,
          bids: [{ amount, bidder: 'أنت', at: now, mine: true }, ...l.bids],
        },
      ),
    );
    return { ok: true };
  }
}
