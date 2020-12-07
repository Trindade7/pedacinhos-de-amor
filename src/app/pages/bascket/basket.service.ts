
import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/database.service';
import { BannerSimpleModel } from '@app/core/models/banner-model';
import { ProductModel } from '@app/core/models/product-model';
import { StoreModel } from '@app/core/models/store-generic-model';
import { StoreGeneric } from '@app/core/store.generic';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Logger as logger } from '@app-core/logger';
import { ProductOrderModel } from '@app/core/models/order-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor (
    private _productsDb: BasketDb,
    private _store: basketStore
  ) {
    logger.startCollapsed(
      '[basket.service] constructor',
      ['calling this._productsDb.collection()']
    );

    this._productsDb.collection$().pipe(
      take(1),
    ).subscribe(
      products => {
        this._store.patch({ items: products, loading: false }, 'get collection');

        logger.collapsed('[basket.service] Success this._productsDb.collection()', [products]);
        logger.endCollapsed(['finished log']);
      },
      rejected => {
        this._store.patch({ status: 'rejected', loading: false }, 'get collection');

        logger.collapsed('[basket.service] Error this._productsDb.collection()', [rejected]);
        logger.endCollapsed(['finished log']);
      },
      () => {
        this._store.patch({
          loading: false,
        }, 'get collection');


        logger.collapsed('[basket.service] success this._productsDb.collection()');
        logger.endCollapsed(['finished log']);
      }
    );
  }

  get loading$(): Observable<boolean> {
    return this._store.loading$;
  }

  get status$(): Observable<string> {
    return this._store.status$;
  }

  get error$(): Observable<Error | null> {
    return this._store.error$;
  }

  get items$(): Observable<ProductOrderModel<ProductModel>[]> {
    return this._store.items$;
  }

  addToBasket(item: ProductOrderModel<ProductModel>) {
    logger.collapsed('[basket.service] addToBasket', [item]);

    return this._store.addItem = item;
  }

}


// *################## Db Service ###################

@Injectable({ providedIn: 'root' })
class BasketDb extends DatabaseService<ProductOrderModel<ProductModel>>{
  basePath = 'basket';
}


// *################## Store ###################
interface IViewConversationPage extends StoreModel {
  items: ProductOrderModel<ProductModel>[];
}

@Injectable({ providedIn: 'root' })
class basketStore extends StoreGeneric<IViewConversationPage>{
  protected store = 'basket-store';

  constructor () {
    super({
      loading: true,
      error: null,
      status: ''
    });
  }

  get items$(): Observable<ProductOrderModel<ProductModel>[]> {
    return this.state$.pipe(
      map(state => state.loading ? [] : state.items)
    );
  }

  set addItem(item: ProductOrderModel<ProductModel>) {
    const items = [...this.state.items, item];
    this.patch({
      items
    }, 'addItem');
  }
}
