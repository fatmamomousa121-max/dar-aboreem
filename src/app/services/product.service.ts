import { Injectable, signal } from '@angular/core';
import { PRODUCTS } from '../data/mock-data';
import { Product } from '../models/misbaha.model';

/** Market catalogue. Swap the mock array for HttpClient when an API is ready. */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _products = signal<Product[]>(PRODUCTS);
  readonly products = this._products.asReadonly();

  byId(id: number): Product | undefined {
    return this._products().find(p => p.id === id);
  }
}
