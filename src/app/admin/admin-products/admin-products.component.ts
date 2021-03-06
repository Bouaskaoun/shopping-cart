import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy{

  subscription:Subscription;
  products!:Product[];
  filterProducts:any;
  productsData!:Product[];
  displayedColumns: string[] = ['data.title', 'price', 'editLink'];

  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productService: ProductService, private _liveAnnouncer: LiveAnnouncer) {
    this.subscription = this.productService.getAll().subscribe(products =>{
      this.filterProducts = this.products = products;
    });
   }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.loadData();
  }

  filter(val:string){
    this.filterProducts = (val) ? this.products.filter(p => p.data.title.toLowerCase().includes(val.toLowerCase())): this.products;
    this.dataSource = this.filterProducts;
  }

  private loadData(){
    this.productService.getAll().subscribe(data => {
      this.productsData=data;
      console.log(this.productsData);
      this.dataSource = new MatTableDataSource<Product>(this.productsData); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
