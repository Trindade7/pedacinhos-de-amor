import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterState } from '@angular/router';
import { ProductOrderModel } from '@app/core/models/order-model';
import { mockProduct, ProductModel } from '@app/core/models/product-model';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {
  id!: string;
  productOrder: ProductOrderModel<ProductModel> = {
    product: mockProduct(),
    details: '',
    quantity: 0
  };

  constructor (
    private _route: ActivatedRoute
  ) {
    this._route.paramMap
      .pipe(switchMap(params => params.get('id') ?? 'no id'), tap(id => (this.id = id)))
      .subscribe(id => {
        console.log(id, this.id);
      });

    console.log(this.productOrder);

  }


  ngOnInit(): void {
  }

}
