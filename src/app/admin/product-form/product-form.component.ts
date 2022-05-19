import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { take } from 'rxjs/operators';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductData } from 'src/app/models/productData';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  id:any;
  productData = new ProductData();
  categories$;
  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {

    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getProduct(this.id).subscribe(item => this.productData = item)
   }

  ngOnInit(): void {
  }

  save(f: NgForm){
    if (this.id) this.productService.update(this.id,this.productData)
    else this.productService.create(f.value);
    
    this.router.navigate(['/admin/products'])
  }

  delete(){
    if (!confirm('Are you sure you want to delete this')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
