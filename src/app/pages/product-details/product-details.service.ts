import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '@app/core/database.service';
import { ProductModel } from '@app/core/models/product-model';
import { Observable } from 'rxjs';
import { watch } from 'rxjs-watcher';
import { delay, take } from 'rxjs/operators';

import { BasketService } from '../bascket/basket.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private _product$!: Observable<ProductModel | null>;
  private _id!: string;

  constructor (
    private _dBSvc: DatabaseService,
    private _basketSvc: BasketService,
    private _activatedRoute: ActivatedRoute
  ) {
    console.log(
      this._activatedRoute.snapshot.paramMap.get('id'),
      '[product-details.service]'
    );
    this._id = this._activatedRoute.snapshot.firstChild?.params.id;

    this._product$ = this._dBSvc
      .docOrNull$<ProductModel>(this._id, 'products')
      .pipe(
        watch('[product-details.service] docOrNull$', 10),
        take(1),
        delay(2000)
      );
  }

  get product$(): Observable<ProductModel | null> {
    return this._product$;
  }

  get id(): string {
    return this._id;
  }

  async addToBasket(quantity: number, details: string): Promise<void> {
    const product = await this._product$.toPromise();
    console.log({ quantity, details, product });

    if (!product) {
      console.log('no product');
      return;
    }

    return this._basketSvc.add({
      product,
      details,
      quantity,
    });
  }
}
