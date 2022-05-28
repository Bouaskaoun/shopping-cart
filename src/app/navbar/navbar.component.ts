import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser!: AppUser;
  constructor(public auth: AuthService) {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser)
   }

  ngOnInit(): void {
    console.log(this.appUser)
  }

  logout(){
    this.auth.logout();
  }

}
