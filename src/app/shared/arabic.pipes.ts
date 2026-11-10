import { Pipe, PipeTransform } from '@angular/core';

const LOCALE = 'ar-EG';

export function arNum(v: number): string {
  return v.toLocaleString(LOCALE);
}

export function sar(v: number): string {
  return `${arNum(v)} ر.س`;
}

const pad = (n: number) => n.toLocaleString(LOCALE, { minimumIntegerDigits: 2, useGrouping: false });

/** Converts Arabic-Indic digits to Latin and returns an integer, or NaN. */
export function parseArabicInt(raw: string): number {
  const latin = raw.replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/[^\d]/g, '');
  return latin ? parseInt(latin, 10) : NaN;
}

/** 1250 → "١٬٢٥٠" */
@Pipe({ name: 'arNum' })
export class ArNumPipe implements PipeTransform {
  transform(v: number | null | undefined): string {
    return v == null ? '' : arNum(v);
  }
}

/** 1250 → "١٬٢٥٠ ر.س" */
@Pipe({ name: 'sar' })
export class SarPipe implements PipeTransform {
  transform(v: number | null | undefined): string {
    return v == null ? '' : sar(v);
  }
}

/** remaining ms → "٠٢:١٤:٠٥" or "انتهى المزاد" */
@Pipe({ name: 'countdown' })
export class CountdownPipe implements PipeTransform {
  transform(ms: number): string {
    if (ms <= 0) return 'انتهى المزاد';
    const s = Math.floor(ms / 1000);
    return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  }
}

/** (timestamp, now) → "قبل ٣ د" */
@Pipe({ name: 'ago' })
export class AgoPipe implements PipeTransform {
  transform(at: number, now: number): string {
    const min = Math.floor((now - at) / 60_000);
    if (min < 1) return 'الآن';
    if (min < 60) return `قبل ${arNum(min)} د`;
    return `قبل ${arNum(Math.floor(min / 60))} س`;
  }
}
