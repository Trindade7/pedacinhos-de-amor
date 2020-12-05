import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '@app/core/models/product-model';

@Component({
  selector: 'app-product-horizontal-list',
  templateUrl: './product-horizontal-list.component.html',
  styleUrls: ['./product-horizontal-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHorizontalListComponent implements OnInit {
  @Input() products: ProductModel[] = [];
  @Output() productActionButtonEvent: EventEmitter<ProductModel> = new EventEmitter();

  constructor () {
    console.log(this.products);
  }

  ngOnInit(): void {
    console.log(this.products);
  }

  onProductAction(emmitedProduct: ProductModel): void {
    this.productActionButtonEvent.emit(emmitedProduct);
  }

}
