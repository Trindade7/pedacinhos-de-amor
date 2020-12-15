import {Injectable} from '@angular/core';
import {ProductModel} from '@app/core/models/product-model';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {Logger as logger} from '@app-core/logger';
import {ProductOrderModel} from '@app/core/models/order-model';
import {BatchDocModel, DatabaseService} from '@app/core/database.service';
import {watch} from 'rxjs-watcher';

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

  constructor(private _db: DatabaseService) {
    this._basket$ = this._db
      .docOrNull$<BasketModel>('basket', this._basketLocation)
      .pipe(watch('[basket.service] _basket$'));

    this._totalItems$ = this._basket$.pipe(
      map(basket => basket?.totalItems ?? null),
      tap(val => console.log({val})),
      watch('[basket.service] _itemsCount$ sub')
    );

    this._items$ = this._db
      .collection$<BasketItemModel>(this._itemsLocation)
      .pipe(watch('[basket.service] _items$'));
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

  // ? Danger zone

  private async _createBatchDocs(
    newItem: BasketItemModel
  ): Promise<BasketBatchModel> {
    const basket = (await this._basket$.toPromise()) ?? {
      totalItems: 0,
      totalPrice: 0,
    };
    const itemPath = `${this._itemsLocation}/${newItem.product.id}`;
    const basketItem: BasketItemModel | null = await this._db
      .docOrNull$<BasketItemModel>(newItem.product.id, itemPath)
      .toPromise();

    if (basketItem) {
      basketItem.quantity += newItem.quantity;
      basketItem.details =
        basketItem.details + '!###########!' + newItem.details;

      basket.totalPrice += newItem.quantity * newItem.product.price;
      basket.totalItems += newItem.quantity;

      logger.collapsed('\n[basket.service] _createBatchDocs', [
        'item found and updated\n',
        {newItem, basketItem, basket},
      ]);

      const res = Promise.resolve({basket, item: basketItem, itemPath});

      return res;
    }
    logger.collapsed('\n[basket.service] _createBatchDocs', [
      'could not find the item in the database\n',
      'creating a new one\n',
      {newItem},
    ]);

    basket.totalPrice += newItem.quantity * newItem.product.price;
    basket.totalItems += newItem.quantity;

    const res = Promise.resolve({basket, item: newItem, itemPath});
    return res;
  }

  private async _updateBatchDocs(
    updatedItem: BasketItemModel
  ): Promise<BasketBatchModel> {
    const basket = (await this._basket$.toPromise()) ?? {
      totalItems: 0,
      totalPrice: 0,
    };
    const itemPath = `${this._itemsLocation}/${updatedItem.product.id}`;

    const basketItem: BasketItemModel | null = await this._db
      .docOrNull$<BasketItemModel>(updatedItem.product.id, itemPath)
      .toPromise();

    if (!basketItem) {
      logger.collapsed('[basket.service] _updateBatchDocs', [
        'could not find the item in the database',
        updatedItem,
      ]);

      return Promise.reject('could not find the item in the database');
    } else {
      const quantityDifference = updatedItem.quantity - basketItem.quantity;

      basketItem.quantity += quantityDifference;
      basketItem.details = updatedItem.details;

      basket.totalPrice += quantityDifference * basketItem.product.price;
      basket.totalItems += quantityDifference;

      logger.collapsed('[basket.service] _updateBatchDocs', [
        'could not find the item in the database',
        updatedItem,
      ]);

      return {basket, item: updatedItem, itemPath};
    }
  }

  private _batchWrite(batchData: BasketBatchModel) {
    const basketUpdate: BatchDocModel = {
      path: this._basketLocation,
      doc: batchData.basket,
      update: true,
    };

    const itemUpdate: BatchDocModel = {
      path: this._basketLocation,
      doc: batchData.item,
      update: true,
    };

    logger.collapsed('[basket.service] _batchWrite', [batchData]);
  }

  //!Danger zone end
  // *Danger zone end

  add(item: BasketItemModel, update = false): Promise<void> {
    console.log('add started');

    if (update) {
      return this._updateBatchDocs(item).then(data => this._batchWrite(data));
    }

    return this._createBatchDocs(item).then(data => this._batchWrite(data));

    // return this._db.create<BasketItemModel>(
    //   item,
    //   this._itemsLocation,
    //   item.product.id
    // );
  }

  delete(id: string): Promise<void> {
    return this._db.delete(id, this._itemsLocation);
  }
}
