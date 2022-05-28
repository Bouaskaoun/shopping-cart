import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product!:Product;
  @Input('show-actions') showActions = true;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

  addProduct(product:Product){
    this.shoppingCartService.addToCart(product);
  }

}