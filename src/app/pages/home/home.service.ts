import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/database.service';
import { BannerSimpleModel } from '@app/core/models/banner-model';
import { ProductModel } from '@app/core/models/product-model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { BasketService } from '../bascket/basket.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _events: BannerSimpleModel[] = [
    {
      id: 'products',
      name: 'Natal',
      color: '#4AB9D4',
      imageUrl: '../../../assets/images/cake-categories/xmas.png',
    },
    {
      id: 'products',
      name: 'Únicos',
      color: '#00a99e',
      imageUrl: '../../../assets/images/cake-categories/uniquel.png',
    },
    {
      id: 'products',
      name: 'Aniversários',
      color: '#3333cc',
      imageUrl: '../../../assets/images/cake-categories/birthdays.png',
    },
    {
      id: 'products',
      name: 'Ano Novo',
      color: '#edeaf5',
      imageUrl: '../../../assets/images/cake-categories/new-year.png',
    },
    {
      id: 'products',
      name: 'Casamentos',
      color: '#6699ff',
      imageUrl: '../../../assets/images/cake-categories/wed22.png',
    },
    {
      id: 'products',
      name: 'Páscoa',
      color: '#F9F0E2',
      imageUrl: '../../../assets/images/cake-categories/easter.png',
    },
  ];

  private _products$: Observable<ProductModel[]>;

  constructor (
    private _dBSvc: DatabaseService,
    private _basketSvc: BasketService
  ) {
    this._products$ = this._dBSvc
      .collection$<ProductModel>('products', {
        limit: 8,
      })
      .pipe(take(1));
  }

  get products$(): Observable<ProductModel[]> {
    return this._products$;
  }

  get events(): BannerSimpleModel[] {
    return this._events;
  }

  addToBascket(product: ProductModel) {
    this._basketSvc.add({
      product,
      details: '',
      quantity: 1,
    });
  }
}
