import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BannerModel, mockBanner } from '@app/core/models/banner-model';

@Component({
  selector: 'app-banner',
  template: `
    <div class="banner-container"
        [ngStyle]="{'background-image': 'url(' + banner.imageUrl + ')'}">
      <h3>{{banner.name}}</h3>
      <p>{{banner.description}}</p>
    </div>
  `,
  styleUrls: ['./banner.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {
  @Input() banner: BannerModel = mockBanner();

  constructor () { }

  ngOnInit(): void {
  }

}
