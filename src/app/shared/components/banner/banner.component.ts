import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BannerModel, newBanner } from '@app/core/models/banner-model';

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
  @Input() banner: BannerModel = {
    name: 'any name',
    color: 'red',
    imageUrl: 'https://placehold.it/100x100?text=user%20avatar',
    description: `Ad laborum tempor magna ut amet veniam officia
    pariatur qui consectetur nostrud culpa non reprehenderit.`,
  };

  constructor () { }

  ngOnInit(): void {
  }

}
