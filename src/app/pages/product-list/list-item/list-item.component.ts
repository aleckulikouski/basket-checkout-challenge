import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '../../../core/interfaces/product.interface';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'apl-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: [ './list-item.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  basketService = inject(BasketService);

  product = input.required<Product>();

  addToBasket(): void {
    this.basketService.addToBasket(this.product());
  }

  removeFromBasket(): void {
    this.basketService.removeFromBasket(this.product());
  }

  get isAddToBasketDisabled(): boolean {
    return !this.basketService.ableToAdd(this.product());
  }

  get isRemoveFromBasketDisabled(): boolean {
    return !this.basketService.isInBasket(this.product());
  }
}
