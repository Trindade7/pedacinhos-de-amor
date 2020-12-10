import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/database.service';
import { BannerSimpleModel } from '@app/core/models/banner-model';
import { ProductModel } from '@app/core/models/product-model';
import { Observable } from 'rxjs';
import { watch } from 'rxjs-watcher';
import { take } from 'rxjs/internal/operators/take';
import { delay } from 'rxjs/operators';

interface CategoryModel {
  banner: BannerSimpleModel;
  producsts$?: Promise<ProductModel[]> | Observable<ProductModel[]>;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _categories: CategoryModel[] = [
    {
      banner: {
        id: 'products',
        name: 'Natal',
        color: '#4AB9D4',
        imageUrl: '../../../assets/images/cake-categories/xmas.png'
      }
    },
    {
      banner: {
        id: 'products',
        name: 'Únicos',
        color: '#00a99e',
        imageUrl: '../../../assets/images/cake-categories/uniquel.png'
      }
    },
    {
      banner: {
        id: 'products',
        name: 'Aniversários',
        color: '#3333cc',
        imageUrl: '../../../assets/images/cake-categories/birthdays.png'
      }
    },
    {
      banner: {
        id: 'products',
        name: 'Ano Novo',
        color: '#edeaf5',
        imageUrl: '../../../assets/images/cake-categories/new-year.png'
      }
    },
    {
      banner: {
        id: 'products',
        name: 'Casamentos',
        color: '#6699ff',
        imageUrl: '../../../assets/images/cake-categories/wed22.png'
      }
    },
    {
      banner: {
        id: 'products',
        name: 'Páscoa',
        color: '#F9F0E2',
        imageUrl: '../../../assets/images/cake-categories/easter.png'
      }
    },
  ];

  constructor (
    private _dBSvc: DatabaseService
  ) {
    this._categories.forEach((category, i) => {
      category.producsts$ =
        this._dBSvc.collection$<ProductModel>(
          'products',
          {
            limit: 8,
            orderBy: category.banner.id
          }
        )
          .pipe(
            watch(`[products.service] products()`, 2),
            take(1),
            delay(1000 * i)
          ).toPromise();
    });

    /*  ._dBSvc.create<Partial<ProductModel>>({
       name: 'online fb any name',
       averageReview: 4,
       price: 300,
       discount: 20,
       totalComments: 65,
       color: 'white',
       imageUrl: 'https://placehold.it/100x100?text=user%20avatar',
       description: `Ad laborum tempor magna ut amet veniam officia
       pariatur qui consectetur nostrud culpa non reprehenderit.`,
       category: 'products',
       tags: ['online', 'test', 'tags']
     }, 'products').then(
       cal => console.log('product saved'),
       rejected => console.log({ rejected })
     ).catch(
       err => console.log({ err })
     );
    */
  }

  get categories(): CategoryModel[] {
    return this._categories;
  }
}
