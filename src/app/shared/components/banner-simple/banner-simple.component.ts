import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BannerModel, BannerSimpleModel, mockBanner } from '@app/core/models/banner-model';

type BackgroundPosition = 'center' | 'left' | 'right';

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
  @Input() backgroundPosition: BackgroundPosition = 'center';

  constructor () { }

  ngOnInit(): void { }

}
