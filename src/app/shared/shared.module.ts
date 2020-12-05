import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ProductComponent } from './components/product/product.component';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from '@app/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ProductHorizontalListComponent } from './components/product-horizontal-list/product-horizontal-list.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BannerSimpleComponent } from './components/banner-simple/banner-simple.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { GridComponent } from './components/grid/grid.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { AppRoutingModule } from '@app/app-routing.module';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ProductSkeletonComponent } from './components/product/product-skeleton/product-skeleton.component';
import { ProductHorizontalListSkeletonComponent } from './components/product-horizontal-list/product-horizontal-list-skeleton/product-horizontal-list-skeleton.component';

@NgModule({
  declarations: [
    BannerComponent,
    ProductComponent,
    ProductHorizontalListComponent,
    BannerSimpleComponent,
    GridComponent,
    ProductSkeletonComponent,
    ProductHorizontalListSkeletonComponent
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
    AppRoutingModule
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
    ProductHorizontalListSkeletonComponent
  ]
})
export class SharedModule { }
