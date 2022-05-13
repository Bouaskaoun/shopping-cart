import { Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { Observable } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router) {
    this.categories$ = categoryService.getCategories();
   }

  ngOnInit(): void {
  }

  save(f: NgForm){
    this.productService.create(f.value);
    this.router.navigate(['/admin/products'])
  }
}
