import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '../../models/misbaha.model';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { ArNumPipe, SarPipe } from '../arabic.pipes';
import { Misbaha } from '../misbaha/misbaha';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Misbaha, ArNumPipe, SarPipe],
  template: `
    @let p = product();
    <article>
      <div class="arch">
        <app-misbaha [look]="p.look" [count]="p.beads" [label]="p.name" />
        @if (p.tag) { <span class="tag">{{ p.tag }}</span> }
      </div>
      <div class="meta">
        <span class="mat">{{ p.material }}</span>
        <span class="num">{{ p.beads | arNum }} حبّة · {{ p.sizeMm | arNum }} مم</span>
      </div>
      <h3>{{ p.name }}</h3>
      <p class="origin">المنشأ: {{ p.origin }}</p>
      <div class="buy">
        <b class="price num">{{ p.price | sar }}</b>
        <button class="add" type="button" (click)="add()">أضف للسلة</button>
      </div>
    </article>
  `,
  styles: `
    :host { display: block; min-width: 0; }
    article { display: flex; flex-direction: column; gap: 8px; height: 100%; }
    .meta { display: flex; justify-content: space-between; gap: 8px; font-family: var(--f-kufi); font-size: .85rem; color: var(--muted); }
    .mat { color: var(--teal); }
    h3 { font-size: 1.18rem; font-weight: 600; }
    .origin { font-size: .92rem; color: var(--muted); }
    .buy { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 6px; }
    .add {
      border: 1px solid var(--ink); background: transparent; border-radius: 8px;
      padding: 5px 14px; cursor: pointer; font-family: var(--f-kufi); font-size: .92rem;
      &:hover { background: var(--ink); color: var(--bg); }
    }
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();
  private readonly cart = inject(CartService);
  private readonly ui = inject(UiService);

  protected add(): void {
    this.cart.add(this.product());
    this.ui.showToast('أُضيفت إلى السلة');
  }
}
