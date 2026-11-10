import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ArNumPipe, SarPipe } from '../../shared/arabic.pipes';
import { Misbaha } from '../../shared/misbaha/misbaha';

@Component({
  selector: 'app-cart-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Misbaha, SarPipe, ArNumPipe],
  host: { '(document:keydown.escape)': 'close()' },
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer {
  protected readonly cart = inject(CartService);
  protected readonly note = signal('');

  close(): void {
    this.cart.isOpen.set(false);
    this.note.set('');
  }

  checkout(): void {
    // Hook a payment / order API in here.
    this.note.set('هذه نسخة عرض: لم يُرسل الطلب ولم يُخصم أي مبلغ.');
  }
}
