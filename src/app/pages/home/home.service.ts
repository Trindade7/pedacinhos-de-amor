import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/database.service';
import { BannerSimpleModel } from '@app/core/models/banner-model';
import { ProductModel } from '@app/core/models/product-model';
import { StoreModel } from '@app/core/models/store-generic-model';
import { StoreGeneric } from '@app/core/store.generic';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger as logger } from '@app-core/logger';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor (
    private _productsDb: ProductsDb,
    private _store: HomeStore
  ) {
    logger.startCollapsed('[home.service] constructor', []);

    this._productsDb.collection().then(
      products => {
        this._store.patch({ products, loading: false }, 'get collection');

        logger.collapsed('[home.service] Success this._productsDb.collection()', [products]);
      },
      rejected => {
        this._store.patch({ status: 'rejected', loading: false }, 'get collection');


        logger.collapsed('[home.service] Error this._productsDb.collection()', [rejected]);
      }

    ).catch(
      error => {
        this._store.patch({
          loading: false,
          error
        }, 'get collection');


        logger.collapsed('[home.service] success this._productsDb.collection()', [error]);
      }
    );

    logger.endCollapsed([]);
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

  get events(): BannerSimpleModel[] {
    return this._store.events;
  }

  get products(): Promise<ProductModel[]> {
    return this._store.products;
  }
}


// *################## Db Service ###################

@Injectable({ providedIn: 'root' })
class ProductsDb extends DatabaseService<ProductModel>{
  basePath = 'products';
}



// *################## Store ###################
interface IViewConversationPage extends StoreModel {
  products: ProductModel[];
  events: BannerSimpleModel[];
}

@Injectable({ providedIn: 'root' })
class HomeStore extends StoreGeneric<IViewConversationPage>{
  protected store = 'Home-store';
  private _events: BannerSimpleModel[] = [
    {
      name: 'Natal',
      color: '#4AB9D4',
      imageUrl: '../../../assets/images/cake-categories/xmas.png'
    },
    {
      name: 'Únicos',
      color: '#00a99e',
      imageUrl: '../../../assets/images/cake-categories/uniquel.png'
    },
    {
      name: 'Aniversários',
      color: '#3333cc',
      imageUrl: '../../../assets/images/cake-categories/birthdays.png'
    },
    {
      name: 'Ano Novo',
      color: '#edeaf5',
      imageUrl: '../../../assets/images/cake-categories/new-year.png'
    },
    {
      name: 'Casamentos',
      color: '#6699ff',
      imageUrl: '../../../assets/images/cake-categories/wed22.png'
    },
    {
      name: 'Páscoa',
      color: '#F9F0E2',
      imageUrl: '../../../assets/images/cake-categories/easter.png'
    },
  ];

  constructor () {
    super({
      loading: true,
      error: null,
    });
  }

  get events(): BannerSimpleModel[] {
    return this._events;
  }

  get products(): Promise<ProductModel[]> {
    return this.state$.pipe(
      map(
        state => state.loading ? [] : state.products
      )
    ).toPromise();
  }
}
