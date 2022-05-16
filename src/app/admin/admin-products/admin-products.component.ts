import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  employee!: Observable<any[]>;
  products:any;
  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe(items =>{
      this.products = items;
      console.log(items)
    });
   }

  ngOnInit(): void {
  }

}
