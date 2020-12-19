import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/database.service';
import { ProductOrderModel } from '@app/core/models/order-model';
import { mockProduct, ProductModel } from '@app/core/models/product-model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { watch } from 'rxjs-watcher';
import { map, tap } from 'rxjs/operators';

import { CustomiseBasketItemComponent } from './customise-basket-item/customise-basket-item.component';

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
  private _totalItems$: Observable<number | null>;

  constructor (
    private _db: DatabaseService,
    private _modalSvc: NzModalService,
  ) {

    this._basket$ = this._db
      .docOrNull$<BasketModel>('basket', this._basketLocation)
      .pipe(watch('[basket.service] _basket$'));

    this._totalItems$ = this._basket$.pipe(
      tap(val => console.log({ val })),
      map(basket => basket?.totalItems ?? null),
      tap(val => console.log({ val })),
      watch('[basket.service] _itemsCount$ sub')
    );

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

  get totalItems$(): Observable<number | null> {
    return this._totalItems$;
  }

  customizeItem(item: BasketItemModel): void {
    this._createCustomizeItemModal(item);
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

  private _createCustomizeItemModal(item: BasketItemModel): void {
    const modal = this._modalSvc.create({
      nzTitle: 'Personalizar encomenda',
      nzContent: CustomiseBasketItemComponent,
      nzComponentParams: { item: item },
      nzClosable: false,

      // nzOnOk: () => new Promise(reject => setTimeout(reject, 500)),
    });
  }
}