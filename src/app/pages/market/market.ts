import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CATEGORIES } from '../../data/mock-data';
import { MaterialCategory } from '../../models/misbaha.model';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../shared/product-card/product-card';

type SortKey = 'featured' | 'asc' | 'desc';

@Component({
  selector: 'app-market',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCard],
  templateUrl: './market.html',
  styleUrl: './market.scss',
})
export class Market {
  private readonly productService = inject(ProductService);

  protected readonly categories = CATEGORIES;
  protected readonly category = signal<MaterialCategory | 'all'>('all');
  protected readonly sort = signal<SortKey>('featured');

  protected readonly visible = computed(() => {
    const cat = this.category();
    const list = this.productService.products().filter(p => cat === 'all' || p.category === cat);
    switch (this.sort()) {
      case 'asc': return [...list].sort((a, b) => a.price - b.price);
      case 'desc': return [...list].sort((a, b) => b.price - a.price);
      default: return list;
    }
  });

  protected setSort(value: string): void {
    this.sort.set(value as SortKey);
  }
}
