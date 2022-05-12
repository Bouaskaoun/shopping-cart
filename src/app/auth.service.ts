import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth, 
    private userService: UserService,
    private route: ActivatedRoute
    ) {
    this.user$ = this.afAuth.authState as Observable<firebase.User>;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('return') || '/';
    localStorage.setItem('returnUrl',returnUrl as string);
    this.afAuth.signInWithRedirect(new firebase.GoogleAuthProvider())
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(switchMap(user => {
      if(user) return this.userService.get(user.uid).valueChanges();
      return of(null);
    })) as Observable<AppUser>;
  }
}
