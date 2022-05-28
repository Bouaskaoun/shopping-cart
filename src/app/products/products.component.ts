import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[] = [];
  filterProducts:Product[] = [];
  category!:string;
  cart:any;
  subscription!:Subscription;
  constructor(
    private productService:ProductService,
    private route:ActivatedRoute,
    private shoppingCartService:ShoppingCartService) {
    this.productService.getAll().subscribe(items => {
      this.filterProducts = this.products = items;
      route.queryParamMap.subscribe(params =>{
        this.category = params.get('category') as string;
        this.filterProducts = (this.category) ? this.products.filter(p => p.data.category.toLowerCase() === this.category.toLowerCase()): this.products;
      });
    });
   }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
