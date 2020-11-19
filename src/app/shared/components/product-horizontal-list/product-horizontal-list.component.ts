import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-horizontal-list',
  templateUrl: './product-horizontal-list.component.html',
  styleUrls: ['./product-horizontal-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHorizontalListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
