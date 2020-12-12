
import { Injectable } from '@angular/core';
import { DatabaseGenericService } from '@app/core/database-generic.service';
import { ProductModel } from '@app/core/models/product-model';
import { StoreModel } from '@app/core/models/store-generic-model';
import { StoreGeneric } from '@app/core/store.generic';
import { Observable, Observer, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Logger as logger } from '@app-core/logger';
import { ProductOrderModel } from '@app/core/models/order-model';
import { DatabaseService } from '@app/core/database.service';
import { watch } from 'rxjs-watcher';


interface BasketModel {
  itemsCount: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private _basketLocation = 'users/test/content';
  private _itemsLocation = `${this._basketLocation}/basket/items`;

  private _basket$: Observable<BasketModel | null>;
  private _items$: Observable<ProductOrderModel<ProductModel>[]>;

  constructor (
    private _db: DatabaseService
  ) {
    this._basket$ = this._db.docOrNull$<BasketModel>(
      'basket',
      this._basketLocation
    ).pipe(
      watch('[basket.service] _basket$')
    );

    this._items$ = this._db.collection$<ProductOrderModel<ProductModel>>(
      this._itemsLocation
    ).pipe(
      watch('[basket.service] _items$')
    );
  }

  get items$(): Observable<ProductOrderModel<ProductModel>[]> {
    return this._items$;
  }

  get basket$(): Observable<BasketModel | null> {
    return this._basket$;
  }

  add(item: ProductOrderModel<ProductModel>): Promise<void> {
    return this._db.create<ProductOrderModel<ProductModel>>(
      item,
      this._itemsLocation,
      item.product.id
    );
  }

  delte(id: string): Promise<void> {
    return this._db.delete(id, this._itemsLocation);
  }
}
