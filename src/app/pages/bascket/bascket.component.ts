import { Component, OnInit } from '@angular/core';
import { mockOrder, ProductOrderModel } from '@app/core/models/order-model';
import { mockProduct, ProductModel } from '@app/core/models/product-model';

@Component({
  templateUrl: './bascket.component.html',
  styleUrls: ['./bascket.component.less']
})
export class BascketComponent implements OnInit {

  order: ProductOrderModel<ProductModel> = mockOrder();

  constructor () { }

  ngOnInit(): void {
  }

}
