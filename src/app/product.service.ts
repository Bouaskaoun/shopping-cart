import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').valueChanges();
  }

  getProduct(productId:String){
    return this.db.object('/product/'+ productId);
  }
}
