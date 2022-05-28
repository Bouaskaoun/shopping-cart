import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCart(){
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId
    
    let result = await this.create()
    localStorage.setItem('cartId', result.key as string)
    return result.key    
  }

  private getCart(cartId:string){
    return this.db.object('/shopping-carts/' + cartId)
  }

  private getItem(cartId:string, productId:string){
    return this.db.object('/shopping-carts/' + cartId +'/items/' + productId);
  }

  async addToCart(product:Product){
    let cartId = await this.getOrCreateCart() as string;
    let item$: Observable<any> = this.getItem(cartId, product.key).valueChanges();

    let item$$ = this.getItem(cartId, product.key);

    item$.pipe(take(1)).subscribe( item => {
      if( item === null ) {
        item$$.set({product: product.data, quantity: 1});
      }
      else{
        item$$.update({quantity: item.quantity + 1});
      }
    });
  }
}
