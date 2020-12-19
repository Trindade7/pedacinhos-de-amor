import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/database.service';
import { ProductOrderModel } from '@app/core/models/order-model';
import { mockProduct, ProductModel } from '@app/core/models/product-model';
import { Observable } from 'rxjs';
import { watch } from 'rxjs-watcher';

type BasketItemModel = ProductOrderModel<ProductModel>;
interface BasketBatchModel {
  basket: BasketModel;
  item: BasketItemModel;
  itemPath: string;
}
interface BasketModel {
  totalItems: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _basketLocation = 'users/GtDGLeONa4S38qWWI2If/content';
  private _itemsLocation = `${this._basketLocation}/basket/items`;

  private _basket$: Observable<BasketModel | null>;
  private _items$: Observable<BasketItemModel[]>;

  constructor (private _db: DatabaseService) {
    this._basket$ = this._db
      .docOrNull$<BasketModel>('basket', this._basketLocation)
      .pipe(watch('[basket.service] _basket$'));


    this._items$ = this._db
      .collection$<BasketItemModel>(this._itemsLocation)
      .pipe(watch('[basket.service] _items$'));
  }

  genMock(): void {
    for (let i = 0; i < 5; i++) {
      this._db.create<ProductModel>(mockProduct(), 'products');
    }
  }

  get items$(): Observable<BasketItemModel[]> {
    return this._items$;
  }

  get basket$(): Observable<BasketModel | null> {
    return this._basket$;
  }

  placeOrder() {
    console.log('order placed');
  }

  add(item: BasketItemModel): Promise<void> {
    return this._db.create<BasketItemModel>(
      item,
      this._itemsLocation,
      item.product.id
    );
  }

  delete(id: string): Promise<void> {
    return this._db.delete(id, this._itemsLocation);
  }
}
