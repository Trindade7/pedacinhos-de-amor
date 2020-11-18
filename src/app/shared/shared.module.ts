import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ProductComponent } from './components/product/product.component';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [BannerComponent, ProductComponent],
  imports: [
    CommonModule
  ],
  exports: [
    // ant-design
    NzInputModule,
    NzButtonModule,
    // ant-design end

    BannerComponent,
    ProductComponent,
  ]
})
export class SharedModule { }
