import { Component, Input, OnInit } from '@angular/core';


import { CartItemModel } from '../../../model/cart-item-models'; // Import CartItemModel

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styles: ``
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItemModel | undefined; // Ensure CartItemModel is used and marked as required with '!'

  constructor() {}

  ngOnInit(): void {
    // Any logic you want to run when this component initializes can be placed here
  }

}
