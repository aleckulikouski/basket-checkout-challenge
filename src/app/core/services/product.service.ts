import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import * as data from '../../../assets/products_sample.json';

@Injectable({ providedIn: 'root' })
export class ProductService {
  http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return of(data).pipe(
      map(response => response.data),
    );
  }
}
