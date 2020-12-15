import {Component, OnInit} from '@angular/core';
import {mockOrder, ProductOrderModel} from '@app/core/models/order-model';
import {mockProduct, ProductModel} from '@app/core/models/product-model';
import {BasketService} from './basket.service';

@Component({
  templateUrl: './bascket.component.html',
  styleUrls: ['./bascket.component.less'],
})
export class BascketComponent implements OnInit {
  unsavedChanges: string[] = [];

  order: ProductOrderModel<ProductModel> = mockOrder();

  constructor(public basketSvc: BasketService) {}

  ngOnInit(): void {}

  addUnsaved(id: string) {
    this.unsavedChanges.push(id);
  }

  updateItem(item: ProductOrderModel<ProductModel>): void {
    this.basketSvc
      .add(item)
      .then(() => {
        const index = this.unsavedChanges.indexOf(item.product.id);
        this.unsavedChanges.splice(index, 1);
      })
      .catch(err => {
        console.log({err});
      });
  }
}
