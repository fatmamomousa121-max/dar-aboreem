import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-guide',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guide.html',
  styleUrl: './guide.scss',
})
export class Guide {
  protected readonly materials = [
    { name: 'الكهرمان', swatch: ['#FFD79A', '#E39A2D', '#9A5A12'], text: 'راتنج أشجار متحجّر عمره ملايين السنين. خفيف ودافئ في اليد، ويطفو في الماء المالح. أشهره البلطيقي.' },
    { name: 'الفاتوران', swatch: ['#F6B26B', '#C8641E', '#6E2E08'], text: 'خليط صناعي قديم من الكهرمان والراتنج، صُنع في ألمانيا مطلع القرن العشرين. يزداد سعره مع العمر واللون.' },
    { name: 'اليُسر', swatch: ['#6B6B6B', '#1E1E1E', '#000000'], text: 'مرجان أسود من البحر الأحمر. يكتسب لمعة مع الاستعمال، ويُطعَّم غالبًا بالفضة أو الذهب.' },
    { name: 'العود', swatch: ['#A47551', '#5B3A22', '#2E1C10'], text: 'خشب عطري من جنوب شرق آسيا. تفوح رائحته من دفء اليد، وكلما كان أثقل وأكثر دهنًا ارتفعت قيمته.' },
  ];

  protected readonly terms = [
    { term: 'الإمام (المئذنة)', text: 'الحبّة الطويلة التي تجمع طرفي السبحة وتتدلّى منها الشرّابة.' },
    { term: 'الفواصل (الشواهد)', text: 'حبّتان تقسمان سبحة الـ٣٣ إلى ثلاثة أقسام، في كل قسم إحدى عشرة حبّة.' },
    { term: 'عدد الحبّات', text: 'الشائع ٣٣ أو ٩٩ حبّة، بعدد أسماء الله الحسنى أو ثلثها.' },
  ];

  protected gradient(s: string[]): string {
    return `radial-gradient(circle at 35% 30%, ${s[0]}, ${s[1]} 55%, ${s[2]})`;
  }
}
