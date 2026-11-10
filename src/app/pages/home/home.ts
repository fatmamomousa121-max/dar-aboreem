import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { ProductService } from '../../services/product.service';
import { CountdownPipe, SarPipe } from '../../shared/arabic.pipes';
import { KhatamPattern } from '../../shared/khatam-pattern/khatam-pattern';
import { Misbaha } from '../../shared/misbaha/misbaha';
import { ProductCard } from '../../shared/product-card/product-card';
import { Tasbih } from './tasbih/tasbih';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Tasbih, KhatamPattern, ProductCard, Misbaha, SarPipe, CountdownPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly products = inject(ProductService);
  protected readonly auction = inject(AuctionService);

  protected readonly featured = computed(() => this.products.products().slice(0, 4));
  /** The live lot closing soonest. */
  protected readonly endingSoon = computed(() => {
    const now = this.auction.now();
    return this.auction.lots()
      .filter(l => l.endsAt > now)
      .sort((a, b) => a.endsAt - b.endsAt)[0];
  });
}
