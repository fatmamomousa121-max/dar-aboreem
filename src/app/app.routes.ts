import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'دار ابو ريم', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'market', title: 'السوق · دار ابو ريم', loadComponent: () => import('./pages/market/market').then(m => m.Market) },
  { path: 'auction', title: 'المزاد · دار ابو ريم', loadComponent: () => import('./pages/auction/auction').then(m => m.Auction) },
  { path: 'auction/:id', title: 'المزاد · دار ابو ريم', loadComponent: () => import('./pages/auction/auction').then(m => m.Auction) },
  { path: 'guide', title: 'دليل الخامات · دار ابو ريم', loadComponent: () => import('./pages/guide/guide').then(m => m.Guide) },
  { path: '**', redirectTo: '' },
];
