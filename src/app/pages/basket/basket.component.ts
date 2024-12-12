import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasketService } from '../../core/services/basket.service';
import { RouterModule } from '@angular/router';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'apl-basket',
  templateUrl: './basket.component.html',
  styleUrls: [ './basket.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BasketItemComponent, RouterModule, FormsModule],
})
export class BasketComponent {
  basketService = inject(BasketService);

  ccNumber = '';

  checkout(): void {
    if (this.ccNumber.toString().length !== 16) {
      window.alert('Card Number Invalid');
      return;
    }
    window.alert('Checkout Success');
  }
}
