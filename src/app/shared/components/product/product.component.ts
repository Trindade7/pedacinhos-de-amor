import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { mockBanner } from '@app/core/models/banner-model';
import { ProductModel, mockProduct } from '@app/core/models/product-model';

@Component({
  selector: 'app-product',
  template: `
    <p>
      product works!
    </p>
  `,
  styleUrls: ['./product.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product: ProductModel = mockProduct();

  constructor () { }

  ngOnInit(): void {
  }

}
