import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(map(actions => actions.map(a => ({ key: a.payload.key, data: a.payload.val() }) ))) as Observable<any[]>;;
  }

  getProduct(productId:string){
    return this.db.object('/products/'+ productId).valueChanges() as Observable<any>;
  }

  update(idProduct: string,product: any){
    return this.db.object('/products/'+ idProduct).update(product);
  }

  delete(idProduct:any){
    return this.db.object('/products/'+ idProduct).remove();
  }
}
