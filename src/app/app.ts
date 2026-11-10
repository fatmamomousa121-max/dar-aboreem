import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDrawer } from './layout/cart-drawer/cart-drawer';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Toast } from './layout/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CartDrawer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
