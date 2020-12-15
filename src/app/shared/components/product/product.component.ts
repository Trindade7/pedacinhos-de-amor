import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {mockBanner} from '@app/core/models/banner-model';
import {ProductModel, mockProduct} from '@app/core/models/product-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product: ProductModel = mockProduct();
  @Input() showActionButton = true;
  @Output() actionButtonEvent: EventEmitter<ProductModel> = new EventEmitter();

  hasDiscount = false;
  finalPrice = 0;

  constructor() {}

  ngOnInit(): void {
    this.finalPrice = this.product.price - this.product.discount ?? 0;
    if (this.product.discount && this.product.discount > 0) {
      this.hasDiscount = true;

      console.log('\n\n\n\n discounted');
    }
  }

  onAction() {
    this.showActionButton
      ? this.actionButtonEvent.emit(this.product)
      : console.log('actionButton should be hidden');
  }
}
