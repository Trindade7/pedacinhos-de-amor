import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-horizontal-list-skeleton',
  templateUrl: './product-horizontal-list-skeleton.component.html',
  styleUrls: ['./product-horizontal-list-skeleton.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHorizontalListSkeletonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
