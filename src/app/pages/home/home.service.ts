import { Injectable } from '@angular/core';
import { BannerSimpleModel } from '@app/core/models/banner-model';
import { ProductModel } from '@app/core/models/product-model';
import { StoreModel } from '@app/core/models/store-generic-model';
import { StoreGeneric } from '@app/core/store.generic';
import { Observable, of } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';
import { Logger as logger } from '@app-core/logger';
import { DatabaseService } from '@app/core/database.service';
import { watch } from 'rxjs-watcher';
import { AngularFirestore } from '@angular/fire/firestore';
import { BasketService } from '../bascket/basket.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _events: BannerSimpleModel[] = [
    {
      id: 'products', name: 'Natal',
      color: '#4AB9D4',
      imageUrl: '../../../assets/images/cake-categories/xmas.png'
    },
    {
      id: 'products', name: 'Únicos',
      color: '#00a99e',
      imageUrl: '../../../assets/images/cake-categories/uniquel.png'
    },
    {
      id: 'products', name: 'Aniversários',
      color: '#3333cc',
      imageUrl: '../../../assets/images/cake-categories/birthdays.png'
    },
    {
      id: 'products', name: 'Ano Novo',
      color: '#edeaf5',
      imageUrl: '../../../assets/images/cake-categories/new-year.png'
    },
    {
      id: 'products', name: 'Casamentos',
      color: '#6699ff',
      imageUrl: '../../../assets/images/cake-categories/wed22.png'
    },
    {
      id: 'products', name: 'Páscoa',
      color: '#F9F0E2',
      imageUrl: '../../../assets/images/cake-categories/easter.png'
    },
  ];

  private _products$: Observable<any[]>;

  constructor (
    private _dBSvc: DatabaseService,
    private _basketSvc: BasketService
  ) {
    this._products$ = this._dBSvc.collection$<ProductModel>(
      'products',
      {
        limit: 8
      }
    )
      .pipe(take(1), delay(2000));
  }

  get products$(): Observable<any[]> {
    return this._products$;
  }

  get events(): BannerSimpleModel[] {
    return this._events;
  }

  addToBascket(product: ProductModel) {
    console.log(product);
    this._basketSvc.add({
      product,
      details: '',
      quantity: 1
    });
  }

}


// *################## Db Service ###################

// @Injectable({ providedIn: 'root' })
// class ProductsDb extends DatabaseGenericService<ProductModel>{
//   basePath = 'products';
// }


// *################## Store ###################
// interface IViewConversationPage extends StoreModel {
//   products: ProductModel[];
//   events: BannerSimpleModel[];
// }

// @Injectable({ providedIn: 'root' })
// class HomeStore extends StoreGeneric<IViewConversationPage>{
//   protected store = 'Home-store';
//   private _events: BannerSimpleModel[] = [
//     {
//       id:'products',name: 'Natal',
//       color: '#4AB9D4',
//       imageUrl: '../../../assets/images/cake-categories/xmas.png'
//     },
//     {
//       id:'products',name: 'Únicos',
//       color: '#00a99e',
//       imageUrl: '../../../assets/images/cake-categories/uniquel.png'
//     },
//     {
//       id:'products',name: 'Aniversários',
//       color: '#3333cc',
//       imageUrl: '../../../assets/images/cake-categories/birthdays.png'
//     },
//     {
//       id:'products',name: 'Ano Novo',
//       color: '#edeaf5',
//       imageUrl: '../../../assets/images/cake-categories/new-year.png'
//     },
//     {
//       id:'products',name: 'Casamentos',
//       color: '#6699ff',
//       imageUrl: '../../../assets/images/cake-categories/wed22.png'
//     },
//     {
//       id:'products',name: 'Páscoa',
//       color: '#F9F0E2',
//       imageUrl: '../../../assets/images/cake-categories/easter.png'
//     },
//   ];

//   constructor () {
//     super({
//       loading: true,
//       error: null,
//       status: ''
//     });
//   }

//   get events(): BannerSimpleModel[] {
//     return this._events;
//   }

//   get products$(): Observable<ProductModel[]> {
//     return this.state$.pipe(
//       map(state => state.loading ? [] : state.products)
//     );
//   }
// }
