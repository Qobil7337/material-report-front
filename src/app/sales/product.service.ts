import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Products} from "../products/products.component";
export interface ProductDetails {
  productID: number
  productName: string,
  productAmount: number,
  productPrice: number,
  total: number,
  imageUrl: string
}
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  isCartCleared = new EventEmitter<boolean>()
  cartSubject = new Subject<ProductDetails>();
  amount = 0
  amount$ = new BehaviorSubject<number>(0);
  addToCart(product: ProductDetails) {
    this.cartSubject.next(product);
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  clearCart() {

  }

}
