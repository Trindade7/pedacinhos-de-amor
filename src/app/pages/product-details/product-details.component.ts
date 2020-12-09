import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Route, Router, RouterState } from '@angular/router';
import { ProductOrderModel } from '@app/core/models/order-model';
import { mockProduct, ProductModel } from '@app/core/models/product-model';
import { ProductDetailsService } from './product-details.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {
  productOrder: ProductOrderModel<ProductModel> = {
    product: mockProduct(),
    details: '',
    quantity: 1
  };

  @ViewChild('orderDetails') orderDetails!: ElementRef<HTMLTextAreaElement>;


  constructor (
    public productSvc: ProductDetailsService
  ) {
    console.log(`\n\nparams\n\n`, productSvc.id, '\n\n\n');

  }

  ngOnInit(): void { }

  personalizeOrder(): void {
    this.navigateToSection('order-options');

    setTimeout(() => {
      this.orderDetails.nativeElement.focus();
    }, 0);
  }

  navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
}
