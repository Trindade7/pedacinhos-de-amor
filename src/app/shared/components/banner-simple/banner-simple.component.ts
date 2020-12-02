import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BannerModel, BannerSimpleModel, mockBanner } from '@app/core/models/banner-model';


@Component({
  selector: 'app-banner-simple',
  templateUrl: './banner-simple.component.html',
  styleUrls: ['./banner-simple.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerSimpleComponent implements OnInit {
  @Input() bannerData: BannerSimpleModel = mockBanner();
  @Input() roundCorners = false;
  @Input() shadowedOnHover = true;

  constructor () { }

  ngOnInit(): void {
    console.log('Banner data\n', this.bannerData, '\n');
  }

}
