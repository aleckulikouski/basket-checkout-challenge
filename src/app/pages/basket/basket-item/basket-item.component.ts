import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '../../../core/interfaces/product.interface';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'apl-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: [ './basket-item.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketItemComponent {
  basketService = inject(BasketService);
  product = input.required<Product>();
}
