import { CartItemModel } from './../model/cart-item-models'; // Import CartItemModel

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoragesService {

  constructor() { }

  existsCart(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: CartItemModel[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): CartItemModel[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : []; // Si 'cart' es null, devuelve un array vacío
  }


  clear(): void {
    localStorage.removeItem('cart');
  }
}