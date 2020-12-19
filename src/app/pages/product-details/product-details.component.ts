import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ProductDetailsService } from './product-details.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less'],
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('orderDetails') orderDetails!: ElementRef<HTMLTextAreaElement>;

  details = '';
  quantity = 1;

  constructor (
    public productSvc: ProductDetailsService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void { }

  addToBasket(): void {
    const modal = this.modalService.({
      nzTitle: 'This is a notification message',
      nzContent: 'This modal will be destroyed after 1 second'
    });
    this.productSvc
      .addToBasket(this.quantity, this.details);
  }

  // goToPersonalizeOrder(): void {
  //   this.navigateToSection('order-options');

  //   setTimeout(() => {
  //     this.orderDetails.nativeElement.focus();
  //   }, 0);
  // }

  // navigateToSection(section: string) {
  //   window.location.hash = '';
  //   window.location.hash = section;
  // }
}
