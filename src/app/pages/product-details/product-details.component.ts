import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ProductDetailsService } from './product-details.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less'],
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('orderDetails') orderDetails!: ElementRef<HTMLTextAreaElement>;

  details = '';
  quantity = 1;

  constructor (public productSvc: ProductDetailsService) { }

  ngOnInit(): void { }

  addToBasket() {
    this.productSvc
      .addToBasket(this.quantity, this.details)
      .then(
        res => {
          console.log(res);
          this.details = '';
          this.quantity = 1;
        }
      );
    console.log('nbb');
  }

  goToPersonalizeOrder(): void {
    this._navigateToSection('order-options');

    setTimeout(() => {
      this.orderDetails.nativeElement.focus();
    }, 0);
  }

  private _navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
}
