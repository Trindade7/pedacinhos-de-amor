import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ProductComponent } from './components/product/product.component';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
@NgModule({
  declarations: [BannerComponent, ProductComponent],
  imports: [
    CommonModule
  ],
  exports: [
    // ant-design
    NzTypographyModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzCarouselModule,
    // ant-design end

    BannerComponent,
    ProductComponent,
  ]
})
export class SharedModule { }
