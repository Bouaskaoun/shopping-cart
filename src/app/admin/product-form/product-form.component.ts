import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { take } from 'rxjs/operators';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product!:{
    title:string,
    price:number,
    category:string,
    imageUrl:string
  };
  categories$;
  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {

    this.categories$ = categoryService.getCategories();
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.productService.getProduct(id).subscribe(item => {this.product = item})
   }

  ngOnInit(): void {
  }

  save(f: NgForm){
    this.productService.create(f.value);
    this.router.navigate(['/admin/products'])
  }
}
