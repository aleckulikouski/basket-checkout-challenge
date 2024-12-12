import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../core/services/product.service';
import { ListItemComponent } from './list-item/list-item.component';
import { BasketService } from '../../core/services/basket.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'apl-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListItemComponent, RouterModule],
})
export class ProductListComponent {
  productService = inject(ProductService);
  basketService = inject(BasketService);

  products = toSignal(this.productService.getProducts());
}
