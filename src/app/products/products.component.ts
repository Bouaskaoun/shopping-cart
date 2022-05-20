import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { async } from '@firebase/util';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[] = [];
  filterProducts:Product[] = [];
  categories:any;
  category!:string;
  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private route:ActivatedRoute) {
    this.productService.getAll().subscribe(items => this.filterProducts = this.products = items);
    this.categoryService.getAll().subscribe(items => this.categories = items);
    route.queryParamMap.subscribe(params =>{
      this.category = params.get('category') as string;
      this.filterProducts = (this.category) ? this.products.filter(p => p.data.category.toLowerCase() === this.category.toLowerCase()): this.products;
      console.log(this.category)
    });
   }

  ngOnInit(): void {
  }

}
