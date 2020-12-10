import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  constructor (
    public productsSvc: ProductsService
  ) { }

  ngOnInit(): void {
  }


}
