import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';
const THEME_KEY = 'dar-alsubah-theme';

/** Toast messages and the light/dark theme switch. */
@Injectable({ providedIn: 'root' })
export class UiService {
  private readonly doc = inject(DOCUMENT);
  private toastTimer?: ReturnType<typeof setTimeout>;

  readonly toast = signal<string | null>(null);
  readonly theme = signal<Theme>(this.initialTheme());

  showToast(text: string): void {
    this.toast.set(text);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 1800);
  }

  toggleTheme(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.doc.documentElement.dataset['theme'] = next;
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage unavailable */ }
  }

  private initialTheme(): Theme {
    let saved: string | null = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch { /* storage unavailable */ }
    if (saved === 'light' || saved === 'dark') {
      this.doc.documentElement.dataset['theme'] = saved;
      return saved;
    }
    return this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
