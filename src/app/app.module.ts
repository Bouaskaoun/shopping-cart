import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShopCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    MyOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    CustomFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      {
        path:'', 
        component: HomeComponent
      },
      {
        path:'products', 
        component: ProductsComponent
      },
      {
        path:'shop-cart', 
        component: ShopCartComponent
      },
      {
        path:'login', 
        component: LoginComponent
      },
      {
        path:'check-out', 
        component: CheckOutComponent, 
        canActivate:[AuthGuardService]
      },
      {
        path:'order-success', 
        component: OrderSuccessComponent, 
        canActivate:[AuthGuardService]
      },
      {
        path:'my/orders', 
        component: MyOrderComponent, 
        canActivate:[AuthGuardService]
      },
      {
        path:'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate:[
          AuthGuardService,
          AdminAuthGuardService
        ]
      },
      {
        path:'admin/products', 
        component: AdminProductsComponent, 
        canActivate:[
          AuthGuardService,
          AdminAuthGuardService
        ]
      },
      {
        path:'admin/new-product', 
        component: ProductFormComponent, 
        canActivate:[
          AuthGuardService,
          AdminAuthGuardService
        ]
      },
      {
        path:'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate:[
          AuthGuardService,
          AdminAuthGuardService
        ]
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
