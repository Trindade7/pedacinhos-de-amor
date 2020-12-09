import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BannerModel, BannerSimpleModel } from '@app/core/models/banner-model';
import { ProductModel } from '@app/core/models/product-model';
import { Observable } from 'rxjs';
import { watch } from 'rxjs-watcher';
import { delay, map, take, tap } from 'rxjs/operators';
import { HomeService } from './home.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  collection: any[] = [];
  collection$!: Observable<any[]>;

  constructor (
    public homeSvc: HomeService,
    // private _firestore: AngularFirestore,
  ) {
    // this.collection$ = this._firestore.collection<ProductModel[]>(
    //   'products',
    //   // ref
    //   // ref => {
    //   //   let query = ref.orderBy(opts.orderBy, opts.orderDirection);
    //   //   query = opts.limitToLast ? query.limitToLast(opts.limitToLast) : query.limit(opts.limitTo);
    //   //   query = opts.startAt ? query.startAt(opts.startAt) : query;

    //   //   return query;
    //   // }
    // ).valueChanges({ idField: 'id' })
    //   .pipe(
    //     watch(`[home.service] products()`, 10),
    //     map(
    //       valList => [...valList]
    //     ),
    //     take(1),
    //     delay(3000)
    //   );
    // // .subscribe(
    // //   val => {
    // //     console.log(val);
    // //     this.collection = val;
    // //   }
    // // );
  }

  ngOnInit(): void {
  }

}
