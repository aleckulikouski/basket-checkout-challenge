import { Injectable, signal } from '@angular/core';
import { BasketItem } from '../interfaces/basket-item.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class BasketService {
  basketItems = signal<{ [key: string]: BasketItem }>({});

  addToBasket(product: Product): void {
    if (this.isInBasket(product)) {
      this.basketItems.update(items => ({
        ...items,
        [product.sku]: { ...items[product.sku], quantity: ++items[product.sku].quantity }
      }));
      return;
    }
    this.basketItems.update(items => ({
      ...items,
      [product.sku]: { product, quantity: 1 },
    }));
  }

  removeFromBasket(product: Product): void {
    const item = this.basketItems()[product.sku];
    if (item.quantity > 1) {
      this.basketItems.update(items => ({
        ...items,
        [product.sku]: { ...item, quantity: --item.quantity },
      }));
      return;
    }
    const items = {...this.basketItems()};
    delete items[product.sku];
    this.basketItems.update(() => items);
  }

  removeAll(product: Product): void {
    const items = {...this.basketItems()};
    delete items[product.sku];
    this.basketItems.update(() => items);
  }

  isInBasket(product: Product): boolean {
    return !!this.basketItems()[product.sku];
  }

  ableToAdd(product: Product): boolean {
    return !this.isInBasket(product) || this.basketItems()[product.sku].quantity < product.basketLimit;
  }

  totalPricePerProduct(product: Product): string {
    const item = this.basketItems()[product.sku];
    return (item.quantity * item.product.price).toFixed(2);
  }

  productQuantity(product: Product): number {
    return this.basketItems()[product.sku].quantity;
  }

  get totalPrice(): string {
    return Object.values(this.basketItems()).reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  }

  get totalQuantity(): number {
    return Object.values(this.basketItems()).reduce((acc, item) => acc + item.quantity, 0);
  }

  get products(): Product[] {
    return Object.keys(this.basketItems()).map(sku => this.basketItems()[sku].product);
  }
}
