/** How a misbaha is drawn: bead gradient (light, base, dark), separator beads and tassel colour. */
export interface MisbahaLook {
  colors: [light: string, base: string, dark: string];
  separator?: string;
  tassel?: string;
}

export type BeadCount = 33 | 99;

export type MaterialCategory = 'amber' | 'yusr' | 'wood' | 'stone';

export interface Product {
  id: number;
  name: string;
  category: MaterialCategory;
  material: string;
  beads: BeadCount;
  sizeMm: number;
  origin: string;
  price: number;
  look: MisbahaLook;
  tag?: string;
}

export interface Bid {
  amount: number;
  bidder: string;
  at: number; // epoch ms
  mine?: boolean;
}

export interface Lot {
  id: string;
  name: string;
  era: string;
  material: string;
  beads: BeadCount;
  sizeMm: number;
  weightG: number;
  description: string;
  startPrice: number;
  endsAt: number; // epoch ms
  look: MisbahaLook;
  bids: Bid[]; // newest first
}

export interface CartLine {
  product: Product;
  qty: number;
}
