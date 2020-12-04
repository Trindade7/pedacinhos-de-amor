import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductModel } from '@app/core/models/product-model';

@Component({
  selector: 'app-product-horizontal-list',
  templateUrl: './product-horizontal-list.component.html',
  styleUrls: ['./product-horizontal-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHorizontalListComponent implements OnInit {
  @Input() products: ProductModel[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
