import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy{

  subscription:Subscription;
  products!:Product[];
  filterProducts:any;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(items =>{
      this.filterProducts = this.products = items;
    });
   }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  ngOnInit(): void {
  }

  filter(val:string){
    this.filterProducts = (val) ? this.products.filter(p => p.data.title.toLowerCase().includes(val.toLowerCase())): this.products;
  }

}
