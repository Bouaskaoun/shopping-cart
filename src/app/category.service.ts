import { map, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<any[]>{
    return this.db.list('/categories').valueChanges();
  }

  getAll(){
    return this.db.list('/categories').snapshotChanges().pipe(map(actions => actions.map(a => ({ key: a.payload.key, data: a.payload.val() }) ))) as Observable<any[]>;
  }
}
