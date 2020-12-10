import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Route, Router, RouterState } from '@angular/router';
import { ProductOrderModel } from '@app/core/models/order-model';
import { mockProduct, ProductModel } from '@app/core/models/product-model';
import { ProductDetailsService } from './product-details.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('orderDetails') orderDetails!: ElementRef<HTMLTextAreaElement>;

  details = '';
  quantity = 1;

  constructor (
    public productSvc: ProductDetailsService
  ) { }

  ngOnInit(): void { }

  addToBasket() {
    this.productSvc.addToBasket(this.quantity, this.details).then(
      a => console.log(a)
    );
    console.log('nbb');
  }

  goToPersonalizeOrder(): void {
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
