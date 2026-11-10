import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { ArNumPipe } from '../../shared/arabic.pipes';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, ArNumPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly cart = inject(CartService);
  protected readonly ui = inject(UiService);

  protected readonly links = [
    { path: '/market', label: 'السوق' },
    { path: '/auction', label: 'المزاد' },
    { path: '/guide', label: 'دليل الخامات' },
  ];
}
