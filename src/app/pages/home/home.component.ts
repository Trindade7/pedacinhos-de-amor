import { Component, OnInit } from '@angular/core';
import { BannerModel, BannerSimpleModel } from '@app/core/models/banner-model';
import { tap } from 'rxjs/operators';
import { HomeService } from './home.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor (
    public homeSvc: HomeService
  ) {
  }

  ngOnInit(): void {
  }

}
