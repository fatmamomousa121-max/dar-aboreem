import { Lot, MaterialCategory, Product } from '../models/misbaha.model';

/**
 * Example data. Replace with HTTP calls in ProductService / AuctionService
 * once a backend exists.
 */

export const CATEGORIES: { key: MaterialCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'amber', label: 'كهرمان وفاتوران' },
  { key: 'yusr', label: 'يُسر' },
  { key: 'wood', label: 'عود وأخشاب' },
  { key: 'stone', label: 'أحجار' },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'كهرمان بلطيقي مشمشي', category: 'amber', material: 'كهرمان', beads: 33, sizeMm: 8, origin: 'ليتوانيا', price: 1850, look: { colors: ['#FFD79A', '#E39A2D', '#9A5A12'] }, tag: 'الأكثر طلبًا' },
  { id: 2, name: 'يُسر أسود مطعّم بالفضة', category: 'yusr', material: 'يُسر', beads: 33, sizeMm: 10, origin: 'البحر الأحمر', price: 1200, look: { colors: ['#6B6B6B', '#1E1E1E', '#000000'], separator: '#C9CCD1', tassel: '#C9CCD1' } },
  { id: 3, name: 'عود كمبودي معتّق', category: 'wood', material: 'عود', beads: 99, sizeMm: 6, origin: 'كمبوديا', price: 2400, look: { colors: ['#A47551', '#5B3A22', '#2E1C10'] } },
  { id: 4, name: 'فاتوران أحمر عتيق', category: 'amber', material: 'فاتوران', beads: 33, sizeMm: 12, origin: 'ألمانيا · ١٩٣٠م', price: 6500, look: { colors: ['#F08A5D', '#B5361F', '#6A1A0E'] }, tag: 'قطعة واحدة' },
  { id: 5, name: 'فيروز نيسابوري', category: 'stone', material: 'فيروز', beads: 33, sizeMm: 8, origin: 'نيسابور، إيران', price: 980, look: { colors: ['#9EE6DA', '#3BB3A3', '#1D6E66'], tassel: '#C08A2E' } },
  { id: 6, name: 'دُرّ النجف الأبيض', category: 'stone', material: 'دُرّ نجف', beads: 33, sizeMm: 9, origin: 'النجف، العراق', price: 650, look: { colors: ['#FFFFFF', '#E4E2DA', '#A9A69C'], tassel: '#2D6E66' } },
  { id: 7, name: 'كوك مطعّم بالفضة', category: 'wood', material: 'كوك', beads: 99, sizeMm: 7, origin: 'الهند', price: 420, look: { colors: ['#8A6A4E', '#4A3324', '#22160E'], separator: '#C9CCD1' } },
  { id: 8, name: 'صندل هندي عطري', category: 'wood', material: 'صندل', beads: 99, sizeMm: 6, origin: 'ميسور، الهند', price: 280, look: { colors: ['#E8C79A', '#C49A62', '#7E5E35'] } },
  { id: 9, name: 'عقيق يماني كبدي', category: 'stone', material: 'عقيق', beads: 33, sizeMm: 10, origin: 'صنعاء، اليمن', price: 1150, look: { colors: ['#E98A7A', '#B23A2E', '#5E1410'] } },
];

const MIN = 60_000;

/** Builds the auction lots with end times relative to `now`. */
export function createLots(now: number): Lot[] {
  return [
    {
      id: 'A1', name: 'فاتوران عثماني مستكاوي', era: 'إسطنبول · نحو ١٩٢٠م', material: 'فاتوران',
      beads: 33, sizeMm: 14, weightG: 62, startPrice: 18000, endsAt: now + 134 * MIN + 12_000,
      description: 'سبحة فاتوران بلون مستكاوي متدرّج، إمامها من الفضة العثمانية المختومة، وحبّاتها بحالة ممتازة دون تشقّق.',
      look: { colors: ['#F6B26B', '#C8641E', '#6E2E08'], tassel: '#B8B8B8' },
      bids: [
        { amount: 24500, bidder: 'أبو فيصل', at: now - 3 * MIN },
        { amount: 24000, bidder: 'م. ع***', at: now - 9 * MIN },
        { amount: 23000, bidder: 'جامع الكويت', at: now - 22 * MIN },
        { amount: 21000, bidder: 'أبو فيصل', at: now - 41 * MIN },
      ],
    },
    {
      id: 'A2', name: 'كهرمان دومينيكاني أزرق', era: 'جمهورية الدومينيكان', material: 'كهرمان',
      beads: 33, sizeMm: 10, weightG: 21, startPrice: 9000, endsAt: now + 47 * MIN,
      description: 'كهرمان نادر يظهر بلون أزرق تحت الضوء فوق البنفسجي، حبّات مخروطة يدويًا.',
      look: { colors: ['#C9E7F2', '#6FA9BF', '#2D5B6E'] },
      bids: [
        { amount: 11800, bidder: 'ن. الشمري', at: now - 2 * MIN },
        { amount: 11000, bidder: 'أبو خالد', at: now - 14 * MIN },
      ],
    },
    {
      id: 'A3', name: 'يُسر مطعّم بالذهب', era: 'الحجاز · منتصف القرن العشرين', material: 'يُسر',
      beads: 33, sizeMm: 11, weightG: 38, startPrice: 4000, endsAt: now + 320 * MIN,
      description: 'يُسر أسود مطعّم بنقش ذهب عيار ٢١، فواصل وإمام من الذهب.',
      look: { colors: ['#6B6B6B', '#1E1E1E', '#000000'], separator: '#D9A441', tassel: '#D9A441' },
      bids: [{ amount: 5200, bidder: 'أم سلطان', at: now - 6 * MIN }],
    },
    {
      id: 'A4', name: 'بلطيقي حليبي ملكي', era: 'كالينينغراد', material: 'كهرمان',
      beads: 99, sizeMm: 7, weightG: 44, startPrice: 6000, endsAt: now + 26 * 60 * MIN,
      description: 'كهرمان بلطيقي معتّق بلون الحليب الملكي، ٩٩ حبّة متطابقة المقاس.',
      look: { colors: ['#FFF4D6', '#F2D58C', '#B8923F'], tassel: '#8A2E1F' },
      bids: [],
    },
  ];
}
