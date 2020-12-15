import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-product-skeleton',
  templateUrl: './product-skeleton.component.html',
  styleUrls: ['./product-skeleton.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSkeletonComponent implements OnInit {
  buttonActive = false;
  avatarActive = false;
  inputActive = false;
  imageActive = true;
  constructor() {}

  ngOnInit(): void {}
}
