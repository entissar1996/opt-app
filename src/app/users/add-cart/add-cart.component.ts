import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/_models/products.model';
import { environment } from 'src/environments/environment';
import { CartService } from "../../_services/cart/cart.service";

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

 /* cart: Cart[] = [];*/


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  //  this.cart = this.cartService.cart;
  }

  /*addProduct(product: IProduct): void{
    this.cartService.addProductToCard(product);
  }

  deleteProduct(product: IProduct): void{
    this.cartService.deleteFromCart(product);
  }
*/
}
