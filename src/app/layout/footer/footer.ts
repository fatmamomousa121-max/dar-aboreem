import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <div class="wrap">
        <span class="brand">دار ابو ريم</span>
        <span>شحن داخل الخليج خلال ٣ أيام عمل · ضمان أصالة الخامة</span>
      </div>
    </footer>
  `,
  styles: `
    footer { border-top: 1px solid var(--line); padding-block: 30px; color: var(--muted); font-size: .92rem; }
    .wrap { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
    .brand { font-family: var(--f-display); font-size: 1.4rem; color: var(--ink); }
  `,
})
export class Footer {}
