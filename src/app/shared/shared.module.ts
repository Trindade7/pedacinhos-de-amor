import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { IconsProviderModule } from '@app/icons-provider.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { BannerSimpleComponent } from './components/banner-simple/banner-simple.component';
import { BannerComponent } from './components/banner/banner.component';
import { GridComponent } from './components/grid/grid.component';
import {
  ProductHorizontalListSkeletonComponent,
} from './components/product-horizontal-list/product-horizontal-list-skeleton/product-horizontal-list-skeleton.component';
import { ProductHorizontalListComponent } from './components/product-horizontal-list/product-horizontal-list.component';
import { ProductSkeletonComponent } from './components/product/product-skeleton/product-skeleton.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    BannerComponent,
    ProductComponent,
    ProductHorizontalListComponent,
    BannerSimpleComponent,
    GridComponent,
    ProductSkeletonComponent,
    ProductHorizontalListSkeletonComponent,
  ],
  imports: [
    CommonModule,
    NzTypographyModule,
    NzRateModule,
    FormsModule,
    NzSpaceModule,
    IconsProviderModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzSkeletonModule,
    NzBadgeModule,
    AppRoutingModule,
  ],
  exports: [
    // ant-design
    NzTypographyModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzCarouselModule,
    NzRateModule,
    NzGridModule,
    NzListModule,
    NzResultModule,
    NzInputNumberModule,
    NzCardModule,
    NzSkeletonModule,
    NzBadgeModule,
    NzMessageModule,
    NzModalModule,
    // ant-design end

    // ##### ANTD ADDED
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    // #####

    BannerComponent,
    ProductComponent,
    ProductHorizontalListComponent,
    BannerSimpleComponent,
    GridComponent,
    ProductSkeletonComponent,
    ProductHorizontalListSkeletonComponent,
  ],
})
export class SharedModule { }
